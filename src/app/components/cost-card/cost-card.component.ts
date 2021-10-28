import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfluxService } from '../../shared/services/influx.service';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-cost-card',
	templateUrl: './cost-card.component.html',
	styleUrls: ['./cost-card.component.css']
})

export class CostCardComponent implements OnInit {
	lightFields: Array<string> = [
		'D6F00034F12A8_CT25',
		'D6F00034F12A8_CT26',
		'D6F00034F12A8_CT27',
		'D6F00034F12A8_CT28',
		'D6F00034F12A8_CT29',
		'D6F00034F12A8_CT30',
		'D6F00034F12A8_CT31',
		'D6F00034F12A8_CT32',
		'D6F00034F12A8_CT33'
	];

	kitchenFields: Array<string> = [
		'D6F00034F12A8_CT1',
		'D6F00034F12A8_CT2',
		'D6F00034F12A8_CT3',
		'D6F00034F12A8_CT4'
	];

	mbportFields: Array<string> = [
		'D6F00034F12A8_CT8',
		'D6F00034F12A8_CT9',
		'D6F00034F12A8_CT10',
		'D6F00034F12A8_CT11',
		'D6F00034F12A8_CT12'
	];

	electrakFields: Array<string> = [
		'D6F00034F12A8_CT13',
		'D6F00034F12A8_CT14',
		'D6F00034F12A8_CT15',
		'D6F00034F12A8_CT16',
		'D6F00034F12A8_CT17'
	];

	acFields: Array<string> = [
		'D6F00034F12A8_CT18'
	];	

	lightPower: number;
	lightCost: number = 0.0;

	kitchenPower: number;
	kitchenCost: number = 0.0;

	mbportPower: number;
	mbportCost: number = 0.0;

	electrakPower: number;
	electrakCost: number = 0.0;

	acPower: number;
	acCost: number = 0.0;

	constructor(private http: HttpClient, private _influxService: InfluxService) { }

	ngOnInit(): void {
		this.calcTodayCost('light');
		this.calcTodayCost('kitchen');
		this.calcTodayCost('mbport');
		this.calcTodayCost('electrak');
		this.calcTodayCost('ac');
	}

	runQuery(range: string, field: string) {
		const query = `|>${range}
									 |> filter(fn:(r) => r._field == "${field}")
									 |> sum(column: "_value")`;
		return  this._influxService.runInfluxQuery(query);
	}

	async calcTodayCost(name:string) {
		let ranges: Array<string> = this.getTimeRange();
		let power:string = name + 'Power';
		let cost:string = name + 'Cost';
		
		if (ranges.includes('')) {
			let res:any = await this.getPowerData(ranges[1], name);
			this[power] = res;
			this[cost] = this[power] * environment.nightTariff;
		} else {
			let nightRes:any = await this.getPowerData(ranges[0], name)
			this[power] = nightRes;
			this[cost] = this[power] * environment.nightTariff;

			let dayRes: any = await this.getPowerData(ranges[1], name);
			this[power] = dayRes;
			this[cost] = this[cost] + this[power] * environment.dayTariff;
		}
		this[cost] = (this[cost] / 100000).toFixed(2);
	}

	async getPowerData(range:string, name:string) {
		let total:number = 0.0;
		let fields: string = name + 'Fields';

		for (let i = 0; i < this[fields].length; i++) {
			let data: any = await this.runQuery(range, this[fields][i]);

			if (data.length > 0) {
				total += data[0]._value;
			}
		}

		return total;
	}

	getTimeRange() {
		let currentTime = new Date().toISOString();
		let today = currentTime.slice(0,10);
		let compareTime =  today + 'T07:00:00Z';
		let timeRange = [];
		let dayRange: string = '';
		let nightRange: string = '';

		if (currentTime > compareTime) {
			dayRange = `range(start: ${today}T07:00:00Z, stop: ${currentTime})`;
			nightRange = `range(start: ${today}T00:00:00Z, stop: ${today}T06:59:59Z)`;
		} else {
			nightRange = `range(start: ${today}T00:00:00Z, stop: ${currentTime})`
		}

		return [dayRange, nightRange];
	}
}
