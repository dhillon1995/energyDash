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
	projected_power_week: any;
	projected_cost_week: any;
	costnow: any;
	power_now: any;
	tariff: number;
	power_today: any;
	cost_today: any;
	sofarweekCost: any;
	sofarweekPower: any;
	project_cost_month: any;
	project_power_month: any;

	constructor(private http: HttpClient, private _influxService: InfluxService) { }

	getDataHttp(url:string) {
		return this.http.get(url);
	}

	ngOnInit(): void {
		// this.testVar2 = JSON.parse(JSON.stringify(testData2));
		// let appInfo = "";
		// this.getDataHttp('../assets/snapshot.json').subscribe(
		//   (data: any) => {
		//     var test = data;
		//     this.testVar3 = JSON.parse(JSON.stringify(test));

		//     //This weeks costs calculations
		//     let y = 15.3022
		//     let x = parseInt(this.testVar3.power_thisweek)
		//     let z = x*y;
		//     let cost_thisweek = z/1000;
		//     this.newcosts = cost_thisweek.toFixed(2)
		//     //Current cost calculations
		//     let currentpower = parseInt(this.testVar3.power_now)
		//     let costnowlong = currentpower*y;
		//     let costnowdivided = costnowlong/100000;
		//     this.costnow = costnowdivided.toFixed(2)
		//   }
		// )
	}

	async calcCurrentUsage() {
		let CT19: any = await this.getCurrentUsageData(19);
		let CT20: any = await this.getCurrentUsageData(20);
		let CT21: any = await this.getCurrentUsageData(21);

		this.power_now = CT19[0]._value + CT20[0]._value + CT21[0]._value;
		this.power_now = (this.power_now).toFixed(2);

		this.tariff = this.checkTariffTime(CT19[0]._time)? environment.dayTariff : environment.nightTariff;
		this.costnow = (this.power_now * this.tariff / 100000).toFixed(2);
	}

	calcTodayUsage() {
		this.calcDayUsage('today').then((res:any) => {
			this.power_today = res[0];
			this.cost_today = res[1];
		});
	}

	async calcDayUsage(time:string) {
		let dayCT19: any = await this.getDayData(19, time, 'day');
		let dayCT20: any = await this.getDayData(20, time, 'day');
		let dayCT21: any = await this.getDayData(21, time, 'day');

		let nightCT19: any = await this.getDayData(19, time, 'night');
		let nightCT20: any = await this.getDayData(20, time, 'night');
		let nightCT21: any = await this.getDayData(21, time, 'night');

		if (dayCT19.length > 0 &&
				dayCT20.length > 0 &&
				dayCT21.length > 0 &&
				nightCT19.length > 0 &&
				nightCT20.length > 0 &&
				nightCT21.length > 0) {
			let power_day: any = dayCT19[0]._value + dayCT20[0]._value +
											 dayCT21[0]._value + nightCT19[0]._value + 
											 nightCT20[0]._value +dayCT21[0]._value;
			power_day = (power_day / 1000).toFixed(2);

			let cost_day: any = environment.dayTariff * (dayCT19[0]._value + dayCT20[0]._value + dayCT21[0]._value) +
												environment.nightTariff * (nightCT19[0]._value + nightCT20[0]._value +dayCT21[0]._value);
			cost_day = (cost_day / 100000).toFixed(2);

			return [power_day, cost_day];
		}

		return [0, 0];
		
	}

	async calcSofarThisWeekUsage() {
		let ranges = this.getSofarRanges();

		if (ranges.length == 0) {
			let calcDayData = await this.calcDayUsage('today')
			this.sofarweekPower = calcDayData[0];
			this.sofarweekCost = calcDayData[1];
		} else {
			let sofarweekPower = 0.0;
			let sofarweekCost = 0.0;

			for (let i = 0; i < ranges.length; i++) {
				let calcDayData = await this.calcDayUsage(ranges[i]);
				sofarweekPower += parseFloat(calcDayData[0]);
				sofarweekCost += parseFloat(calcDayData[1]);
			}

			this.sofarweekCost = sofarweekCost.toFixed(2);
			this.sofarweekPower = sofarweekPower.toFixed(2);
		}
	}

	async calcProjectedThisWeekUsage() {
		let ranges = this.getSofarRanges();

		if (ranges.length == 0) {
			let calcDayData = await this.calcDayUsage('today')
			this.projected_power_week = calcDayData[0] * 7;
			this.projected_cost_week = calcDayData[1] * 7;
		} else {
			let averagePower = 0.0;
			let averageCost = 0.0;
			let totalPower: number   = 0.0;
			let totalCost: number    = 0.0;

			for (let i = 0; i < ranges.length; i++) {
				let calcDayData = await this.calcDayUsage(ranges[i]);
				totalPower += parseFloat(calcDayData[0]);
				totalCost += parseFloat(calcDayData[1]);
			}

			averageCost = totalPower / ranges.length;
			averagePower = totalCost / ranges.length;

			let today = new Date();
			let day = today.getDay();

			let remainDaysPower = (6 - day) * averageCost;
			let remainDaysCost = (6 - day) * averagePower;

			this.projected_power_week = (remainDaysPower + totalPower).toFixed(2);
			this.projected_cost_week = (remainDaysCost + totalCost).toFixed(2);
		}
	}

	async calcProjectedThisMonthUsage() {
		let today = new Date();
		let date = today.getDate();

		let totalPower: number   = 0.0;
		let totalCost: number    = 0.0;
		let averagePower: number = 0.0;
		let averageCost: number  = 0.0;

		for (let i = date; i >= 0; i--) {
			let resultDate = new Date();
			resultDate.setDate(resultDate.getDate() - i);

			let calcDayData = await this.calcDayUsage(resultDate.toISOString());
			totalPower += parseFloat(calcDayData[0]);
			totalCost  += parseFloat(calcDayData[1]);
		}

		averageCost  = averageCost /  date;
		averagePower = averagePower / date;

		// Get last date
		let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
		let lastDate = lastDayOfMonth.getDate();

		averagePower = averagePower * (lastDate - date);
		averageCost = averageCost * (lastDate - date);

		this.project_cost_month = (averageCost + totalCost).toFixed(2);
		this.project_power_month = (averagePower + totalPower).toFixed(2);
	}

	getSofarRanges() {
		let today = new Date();
		let day = today.getDay();
		let dateArray: Array<string> = [];

		if (day == 0) {
			return [];
		} else {
			for (let i = day; i >= 0; i --) {
				let resultDate = new Date();
				resultDate.setDate(resultDate.getDate() - i);
				dateArray.push(resultDate.toISOString());
			}
		}

		return dateArray;
	}

	getCurrentUsageData(num: number) {
		const query = `|> range(start: -5m, stop: now())
									|> filter(fn:(r) => r._field == "D6F00034F12A8_CT${num}")
									|> aggregateWindow(every: 1d, fn: mean)`;
		return  this._influxService.runInfluxQuery(query);
	}

	getDayData(num: number, time:string, day: string) {
		const today: any = time=='today'? new Date().toISOString().slice(0, 10) :  new Date(time).toISOString().slice(0, 10);
		let start: string = '';
		let end: string = '';

		if (day == 'day') {
			start = today + 'T07:00:00Z';
			end   = today + 'T23:59:59Z';
		} else {
			start = today + 'T00:00:00Z';
			end   = today + 'T06:59:59Z';
		}

		const query = `|> range(start: ${start}, stop: ${end})
									|> filter(fn:(r) => r._field == "D6F00034F12A8_CT${num}" and r._value > 0)
									|> sum(column: "_value")`;

		return  this._influxService.runInfluxQuery(query);
	}

	getTestData() {
		const query = `|> range(start: 2021-10-26T07:00:00Z, stop: 2021-10-26T23:59:59Z)
									|> filter(fn:(r) => r._field == "D6F00034F12A8_CT19" and r._value > 0)
									|> sum(column: "_value")`;
		this._influxService.runInfluxQuery(query).then((res:any) => {
			console.log(res);
		})
	}

	ngAfterViewInit() {
		this.calcCurrentUsage();
		this.calcTodayUsage();
		this.calcProjectedThisWeekUsage();
		this.calcProjectedThisMonthUsage();
		this.calcSofarThisWeekUsage();

		//this.getTestData();
	}

	checkTariffTime(time: string): boolean {
		const pickTime = new Date(time);
		const hour = pickTime.getHours();

		if ( hour > 7 && hour < 24) return true; 
		return false;
	}
}
