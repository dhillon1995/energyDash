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
		let CT22: any = await this.getCurrentUsageData(22);
		let CT23: any = await this.getCurrentUsageData(23);
		let CT24: any = await this.getCurrentUsageData(24);

		this.power_now = parseFloat(CT22[0]._value) + parseFloat(CT23[0]._value) + parseFloat(CT24[0]._value);
		this.power_now = (this.power_now).toFixed(2);

		this.tariff = this.checkTariffTime(CT22[0]._time)? environment.dayTariff : environment.nightTariff;
		this.costnow = (this.power_now * this.tariff / 100000).toFixed(2);
	}

	calcTodayUsage() {
		let today = new Date();

		this.calcDayUsage(today.toISOString()).then((res:any) => {
			this.power_today = res[0];
			this.cost_today = res[1];
		});
	}

	async calcDayUsage(time:string) {
		const calcDate: any = new Date(time).toISOString().slice(0, 10);
		let _time = calcDate +  'T07:00:00Z';

		if (calcDate == (new Date()).toISOString().slice(0,10) && (new Date()).toISOString() < _time) {
			let nightCT22: any = await this.getDayData(22, time, 'night');
			let nightCT23: any = await this.getDayData(23, time, 'night');
			let nightCT24: any = await this.getDayData(24, time, 'night');

			let nightCT22Data = nightCT22.length > 0 ? parseFloat(nightCT22[0]._value):0;
			let nightCT23Data = nightCT23.length > 0 ? parseFloat(nightCT23[0]._value):0;
			let nightCT24Data = nightCT24.length > 0 ? parseFloat(nightCT24[0]._value):0;
			
			let power_day: any = nightCT22Data + nightCT23Data + nightCT24Data;
			power_day = (power_day / 1000).toFixed(2);

			let cost_day: any = environment.nightTariff * power_day;
			cost_day = (cost_day / 100000).toFixed(2);

			return [power_day, cost_day];
			
		} else {
			let dayCT22: any = await this.getDayData(22, time, 'day');
			let dayCT23: any = await this.getDayData(23, time, 'day');
			let dayCT24: any = await this.getDayData(24, time, 'day');

			let nightCT22: any = await this.getDayData(22, time, 'night');
			let nightCT23: any = await this.getDayData(23, time, 'night');
			let nightCT24: any = await this.getDayData(24, time, 'night');

			let dayCT22Data = dayCT22.length > 0 ? parseFloat(dayCT22[0]._value):0;
			let dayCT23Data = dayCT23.length > 0 ? parseFloat(dayCT23[0]._value):0;
			let dayCT24Data = dayCT24.length > 0 ? parseFloat(dayCT24[0]._value):0;
			let nightCT22Data = nightCT22.length > 0 ? parseFloat(nightCT22[0]._value):0;
			let nightCT23Data = nightCT23.length > 0 ? parseFloat(nightCT23[0]._value):0;
			let nightCT24Data = nightCT24.length > 0 ? parseFloat(nightCT24[0]._value):0;
			
			let power_day: any = dayCT22Data + dayCT23Data + dayCT24Data + nightCT22Data + nightCT23Data + nightCT24Data;
			power_day = (power_day / 1000).toFixed(2);

			let cost_day: any = environment.dayTariff * (dayCT22Data + dayCT23Data + dayCT24Data) +
								environment.nightTariff * (nightCT22Data + nightCT23Data + nightCT24Data);
			cost_day = (cost_day / 100000).toFixed(2);
			return [power_day, cost_day];
		}

		return [0, 0];
	}

	async calcSofarThisWeekUsage() {
		let ranges = this.getSofarRanges();
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

	async calcProjectedThisWeekUsage() {
		let ranges = this.getSofarRanges();

		let averagePower = 0.0;
		let averageCost = 0.0;
		let totalPower: number   = 0.0;
		let totalCost: number    = 0.0;

		for (let i = 0; i < ranges.length; i++) {
			let calcDayData = await this.calcDayUsage(ranges[i]);
			totalPower += parseFloat(calcDayData[0]);
			totalCost += parseFloat(calcDayData[1]);
		}

		console.log("******************* Projected Week *******************");
		console.log(totalPower, totalCost);

		averagePower = totalPower / ranges.length;
		averageCost = totalCost / ranges.length;

		let today = new Date();
		let day = today.getDay();

		let remainDaysPower = (7 - day) * averagePower;
		let remainDaysCost = (7 - day) * averageCost;

		this.projected_power_week = (remainDaysPower + totalPower).toFixed(2);
		this.projected_cost_week = (remainDaysCost + totalCost).toFixed(2);
	}

	async calcProjectedThisMonthUsage() {
		let today = new Date();
		let date = today.getDate();

		let totalPower: any   = 0.0;
		let totalCost: any    = 0.0;
		let averagePower: any = 0.0;
		let averageCost: any  = 0.0;
		let dateArray: any = [];

		for (let i = date - 1; i >= 0; i--) {
			let resultDate = new Date();
			resultDate.setDate(resultDate.getDate() - i);
			dateArray.push(resultDate.toISOString());
		}

		for (let i = 0; i < dateArray.length; i++){
			let calcDayData = await this.calcDayUsage(dateArray[i]);
			totalPower += parseFloat(calcDayData[0]);
			totalCost += parseFloat(calcDayData[1]);	
		}
		console.log("******************* Projected Month *******************");
		console.log(totalPower, totalCost);
		averageCost  = totalCost/date;
		averagePower = totalPower/date;
		console.log(averagePower, averageCost);
		// Get last date
		let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
		let lastDate = lastDayOfMonth.getDate();

		let _averagePower = averagePower * (lastDate - date);
		let _averageCost  = averageCost * (lastDate - date);
    
    console.log(lastDate-date);
    console.log(_averagePower + totalPower, _averageCost + totalCost);
		this.project_cost_month = (_averageCost + totalCost).toFixed(2);
		this.project_power_month = (_averagePower + totalPower).toFixed(2);
	}

	getSofarRanges() {
		let today = new Date();
		let day = today.getDay();
		let dateArray: Array<string> = [];

		if (day == 0) {
			for (let i = 6; i >= 0; i --) {
				let resultDate = new Date();
				resultDate.setDate(resultDate.getDate() - i);
				dateArray.push(resultDate.toISOString());
			}
		} else {
			for (let i = day; i > 0; i --) {
				let resultDate = new Date();
				resultDate.setDate(resultDate.getDate() - (i-1));
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
		let today = new Date();
		const calcDate: any = new Date(time).toISOString().slice(0, 10);
		let start: string = '';
		let end: string = '';

		if (calcDate == today.toISOString().slice(0,10)) {
			let time = calcDate +  'T07:00:00Z';

			if ((new Date()).toISOString() > time) {
				if (day == 'day') {
					start = calcDate + 'T07:00:00Z';
					end   = (new Date()).toISOString();
				} else {
					start = calcDate + 'T00:00:00Z';
					end   = calcDate + 'T06:59:59Z';
				}
			} else {
				start = calcDate + 'T00:00:00Z';
				end   = (new Date()).toISOString();
			}
		} else {
			if (day == 'day') {
				start = calcDate + 'T07:00:00Z';
				end   = calcDate + 'T23:59:59Z';
			} else {
				start = calcDate + 'T00:00:00Z';
				end   = calcDate + 'T06:59:59Z';
			}
		}

		const query = `|> range(start: ${start}, stop: ${end})
									|> filter(fn:(r) => r._field == "D6F00034F12A8_CT${num}" and r._value > 0)
									|> sum(column: "_value")`;
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

	ngAfterViewInit() {
		this.calcCurrentUsage();
		this.calcTodayUsage();
		this.calcProjectedThisWeekUsage();
		this.calcProjectedThisMonthUsage();
		this.calcSofarThisWeekUsage();
		// this.getTestData();
	}

	checkTariffTime(time: string): boolean {
		const pickTime = new Date(time);
		const hour = pickTime.getHours();

		if ( hour > 7 && hour < 24) return true; 
		return false;
	}
}
