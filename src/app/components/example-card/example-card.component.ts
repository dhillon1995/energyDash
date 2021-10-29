import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfluxService } from '../../shared/services/influx.service';
import { InfluxData }  from '../../shared/types/influxdata';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-example-card',
	templateUrl: './example-card.component.html',
	styleUrls: ['./example-card.component.css']
})
export class ExampleCardComponent implements OnInit {
	projected_power_week: number = 0.0;
	projected_cost_week: number = 0.0;
	costnow: number = 0.0;
	power_now: number = 0.0;
	tariff: number;
	power_today: number = 0.0;
	cost_today: number = 0.0;
	sofarweekCost: number = 0.0;
	sofarweekPower: number = 0.0;
	project_cost_month: number = 0.0;
	project_power_month: number = 0.0;

	overallFields: Array<string> = [
    'D6F00034F12A8_CT22',
    'D6F00034F12A8_CT23',
    'D6F00034F12A8_CT24'
  ];

	constructor(private http: HttpClient, private _influxService: InfluxService) { }

	getDataHttp(url:string) {
		return this.http.get(url);
	}

	ngOnInit(): void {
		this.calcCurrentUsage();
		this.calcTodayUsage();
		this.calcSofarThisWeekUsage();
		this.calcProjectedThisMonthUsage();
	}

	runQuery(range: string, field: string, isDay:boolean) {
    let query: any;

    if (isDay) {
      query = `|>${range}
               |> filter(fn:(r) => r._field == "${field}" and r._value > 0)
               |> hourSelection(start:7, stop:23)
               |> sum(column: "_value")`;
    } else {
      query = `|>${range}
               |> filter(fn:(r) => r._field == "${field}" and r._value > 0)
               |> hourSelection(start:0, stop:7)
               |> sum(column: "_value")`;
    }
    return  this._influxService.runInfluxQuery(query);
  }

  async getCostData(range:string) {
    let power:number = 0.0;
    let cost:number = 0.0;

    for (let i = 0; i < this.overallFields.length; i++) {
      let nightPower: any = await this.runQuery(range, this.overallFields[i], false);
      let dayPower: any = await this.runQuery(range, this.overallFields[i], true);
      power += nightPower[0]._value + dayPower[0]._value;
      cost += nightPower[0]._value * environment.nightTariff + dayPower[0]._value * environment.dayTariff;
    }

    power = Math.round((power / 1000 + Number.EPSILON) * 100) / 100;
    cost = Math.round((cost / 100000 + Number.EPSILON) * 100) / 100;
    return [power, cost];
  }

	async calcCurrentUsage() {
		let CT22: any = await this.getCurrentUsageData(22);
		let CT23: any = await this.getCurrentUsageData(23);
		let CT24: any = await this.getCurrentUsageData(24);

		this.power_now = Math.round((parseFloat(CT22[0]._value) + parseFloat(CT23[0]._value) + parseFloat(CT24[0]._value) + Number.EPSILON) * 100) / 100;

		this.tariff = this.checkTariffTime(CT22[0]._time)? environment.dayTariff : environment.nightTariff;
		this.costnow = Math.round((this.power_now * this.tariff / 100000 + 1.2046 + Number.EPSILON) * 100) / 100;
	}

	calcTodayUsage() {
		let today = new Date();
		let start = today.toISOString().slice(0, 10) + 'T00:00:00Z';
		let end = today.toISOString();

		let range = `range(start: ${start}, stop: ${end})`;
		this.getCostData(range).then((res: any) => {
			this.power_today = res[0];
			this.cost_today = res[1];
		})
	}

	calcSofarThisWeekUsage() {
		let range = this.getSofarThisWeekRange();
		let today = new Date();
		let day = today.getDay();
		let dailyCharge = day==0? 7: day;

		this.getCostData(range).then((res:any) => {
			this.sofarweekCost = res[1];
			this.sofarweekPower = Math.round(( res[0] + 1.2046 * dailyCharge + Number.EPSILON) * 100) / 100;
			this.calcProjectedThisWeekUsage();
		});
	}

	calcProjectedThisWeekUsage() {
		let averagePower = 0.0;
		let averageCost = 0.0;
		let today = new Date();
		let day = today.getDay();

		averagePower = this.sofarweekPower / day;
		averageCost = this.sofarweekCost / day;

		let remainDaysPower = (7 - day) * averagePower;
		let remainDaysCost = (7 - day) * averageCost;

		this.projected_power_week = Math.round((remainDaysPower + this.sofarweekPower + Number.EPSILON) * 100) / 100;
		this.projected_cost_week = Math.round((remainDaysCost + this.sofarweekCost + 1.2046 * 7 + Number.EPSILON) * 100) / 100;
	}

	calcProjectedThisMonthUsage() {
		let _date = new Date(); let dailyChargeNumber = _date.getDate();
    let firstDay = new Date(_date.getFullYear(), _date.getMonth(), 2).toISOString().slice(0, 10) + 'T00:00:00Z';
    let endDay =_date.toISOString();
    let range = `range(start: ${firstDay}, stop: ${endDay})`;
    let cost: number;
    let power: number;
    let averageCost: number;
    let averagePower: number;

    this.getCostData(range).then((res: any) => {
    	cost = res[1] + 1.2046 * dailyChargeNumber;
    	power = res[0];
    	averageCost = cost / dailyChargeNumber;
    	averagePower = power / dailyChargeNumber;

    	let lastDayOfMonth = new Date(_date.getFullYear(), _date.getMonth() + 1, 0);
			let lastDate = lastDayOfMonth.getDate();

			let remainePower = averagePower * (lastDate - dailyChargeNumber);
			let remainCost  = 1.2046 * averageCost * (lastDate - dailyChargeNumber);

			this.project_cost_month = Math.round((remainCost + cost + Number.EPSILON) * 100) / 100;
			this.project_power_month = Math.round((remainePower + power + Number.EPSILON) * 100) / 100;
    });
	}

	getSofarThisWeekRange() {
		let monday = this.getMonday(new Date());
		let start = monday.toISOString().slice(0,10) + 'T00:00:00Z';
		let end = new Date().toISOString();
		let range = `range(start: ${start}, stop: ${end})`;
		return range;
	}

	getCurrentUsageData(num: number) {
		const query = `|> range(start: -5m, stop: now())
					|> filter(fn:(r) => r._field == "D6F00034F12A8_CT${num}")
					|> aggregateWindow(every: 1d, fn: mean)`;

		return  this._influxService.runInfluxQuery(query);
	}

	getTestData() {
		const query = `|> range(start: 2021-10-20T07:00:00Z, stop: 2021-10-20T23:59:59Z)
									|> filter(fn:(r) => r._field == "D6F00034F12A8_CT22" and r._value > 0)
									|> sum(column: "_value")`;
		this._influxService.runInfluxQuery(query).then((res:any) => {
			console.log(res);
		});
	}

	checkTariffTime(time: string): boolean {
		const pickTime = new Date(time);
		const hour = pickTime.getHours();

		if ( hour > 7 && hour < 24) return true; 
		return false;
	}

	getMonday(d) {
	  d = new Date(d);
	  let day = d.getDay(),
	      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	  return new Date(d.setDate(diff));
	}
}
