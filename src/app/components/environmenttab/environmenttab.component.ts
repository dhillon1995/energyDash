import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InfluxService } from '../../shared/services/influx.service';
import { FloorplanService } from '../../shared/services/floorplan.service';
import { FormGroup, FormControl } from '@angular/forms';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ZoomchartComponent } from '../zoomchart/zoomchart.component';

const sensorList = [
	{ id: '6119810', location:'-' },
	{ id: '6119798', location:'meeting room 2' },
	{ id: '6119795', location:'meeting 4' },
	{ id: '6119765', location:'IT/CF window' },
	{ id: '6119729', location:'ops rear centre' },
	{ id: '6119815', location:'meeting 1' },
	{ id: '6120094', location:'finance window' },
	{ id: '6119813', location:'Praxis window' },
	{ id: '6119818', location:'Ops rear window' },
	{ id: '6120084', location:'TPI Sales Window' },
	{ id: '6120043', location:'-' },
	{ id: '6120042', location:'Guest kitchen' },
	{ id: '6119939', location:'main kitchen' },
	{ id: '6119920', location:'reception' },
	{ id: '6120085', location:'meeting 3' },
	{ id: '6120127', location:'direct sales printer 2' },
	{ id: '6119806', location:'meeting 5' },
	{ id: '6119791', location:'Trading window (fred)' },
	{ id: '6120093', location:'direct sales window' },
	{ id: '6119801', location:'finance centre' }
];

@Component({
	selector: 'app-environmenttab',
	templateUrl: './environmenttab.component.html',
	styleUrls: ['./environmenttab.component.css']
})

export class EnvironmenttabComponent implements OnInit {
	width = 600;
	height = 400;
	type = "msline";
	dataFormat = "json";
	sensorList: any[];
	tempDataSource: any;
	luxDataSource: any;
	humiDataSource: any;
	range = new FormGroup({
		start: new FormControl(),
		end: new FormControl()
	});
	periodType: string = 'Day';
	tempLoading: boolean = true;
	humiLoading: boolean = true;
	luxLoading: boolean = true;

	/** Execute a query and receive line table metadata and rows. */
	constructor(
		private http: HttpClient,
		private _influxService: InfluxService,
		private flooplanService: FloorplanService,
		//public chartZoomDialog: MatDialog
	) {
		this.sensorList = sensorList;
	}

	ngOnInit(): void {
		//this.getInfluxDBResult();
		// this.sensorList = this.flooplanService.getSensorsData();
		// this.convertSensorDataToFusionDataSource(this.sensorList);
		this.changeViewType('day');
	}

	prepareTempDataSource() {
		Object.assign(this.tempDataSource, {
			chart: {
				caption: `Temperature ${this.periodType} view`,
				yaxisname: "Value",
				showhovereffect: "1",
				drawcrossline: "5",
				plottooltext: " <b>$seriesName</b> value <b>$dataValue</b> at $label",
				theme: "fusion",
			},
		});
	}

	prepareHumiDataSource() {
		Object.assign(this.humiDataSource, {
			chart: {
				caption: `Humidity ${this.periodType} view`,
				yaxisname: "Value",
				showhovereffect: "1",
				drawcrossline: "5",
				plottooltext: " <b>$seriesName</b> value <b>$dataValue</b> at $label",
				theme: "fusion",
			},
		});
	}


	prepareLuxDataSource() {
		Object.assign(this.luxDataSource, {
			chart: {
				caption: `Light ${this.periodType} view`,
				yaxisname: "Value",
				showhovereffect: "1",
				drawcrossline: "5",
				plottooltext: " <b>$seriesName</b> value <b>$dataValue</b> at $label",
				theme: "fusion",
			},
		});
	}

	getDataHttp(url:string) {
		let header = new HttpHeaders({ "Access-Control-Allow-Origin":"*"});
		const requestOptions = {  headers: header}; 
		return this.http.get(url, requestOptions);
	}

	customizeTooltip(arg) {
		return {
				text: "Sensor: " + arg.attribute("location") + " ft&#178"
		};
	}

	convertSensorDataToFusionDataSource(list: any[]) {
		this.convertTemperatureData(list, 'temperature');
	}

	convertTemperatureData(list: any[], flag: string) {

	}

	changeViewType(flag:string) {
		switch(flag) {
			case "day":
				this.periodType = 'Day';
				this.tempLoading = false;
				this.humiLoading = false;
				this.luxLoading = false;
				this.getDayTypePeriod();
				break;
			case 'week':
				this.periodType = 'Week';
				this.tempLoading = false;
				this.humiLoading = false;
				this.luxLoading = false;
				this.getWeekTypePeriod();
				break;
			case 'month':
				this.periodType = 'Month';
				this.tempLoading = false;
				this.humiLoading = false;
				this.luxLoading = false;
				this.getMonthTypePeriod();
				break;
		}
	}

	getDayTypePeriod() {
		this.tempDataSource = {};
		this.prepareTempDataSource();
		this.getChartData('temperature', 'day');

		this.humiDataSource = {};
		this.prepareHumiDataSource();
		this.getChartData('humidity', 'day');

		this.luxDataSource = {};
		this.prepareLuxDataSource();
		this.getChartData('light', 'day');
	}

	getWeekTypePeriod() {
		this.tempDataSource = {};
		this.prepareTempDataSource();
		this.getChartData('temperature', 'week');

		this.humiDataSource = {};
		this.prepareHumiDataSource();
		this.getChartData('humidity', 'week');

		this.luxDataSource = {};
		this.prepareLuxDataSource();
		this.getChartData('light', 'week');
	}

	getMonthTypePeriod() {
		this.tempDataSource = {};
		this.prepareTempDataSource();
		this.getChartData('temperature', 'month');

		this.humiDataSource = {};
		this.prepareHumiDataSource();
		this.getChartData('humidity', 'month');

		this.luxDataSource = {};
		this.prepareLuxDataSource();
		this.getChartData('light', 'month');
	}

	getDateFormate(time:string) {
		const _time = time.split('T');
		return _time[0];
	}

	getChartData(sensorType: string, period: string) {
		let sensorQuery: string = '';
		let periodQuery: Array<string> = [];

		switch(sensorType) {
			case 'temperature':
				sensorQuery = "uplink_message_decoded_payload_averageTemperature_value";
				break;
			case 'humidity':
				sensorQuery = "uplink_message_decoded_payload_humidity_value";
				break;
			case 'light':
				sensorQuery = "uplink_message_decoded_payload_lux_value";
				break;
		}

		switch(period) {
			case 'day':
				periodQuery = ["-1d", "1h"];
				break;
			case 'week':
				periodQuery = ["-1w", "1d"];
				break;
			case 'month':
				periodQuery = ["-30d", "1w"];
				break;
		}

		sensorList.forEach((sensor, i) => {
			const latestQuery =  `|> range(start: ${periodQuery[0]})
				|> filter(fn:(r) => r._field == "${sensorQuery}" and
				r.topic == "v3/bgoffice@bgpoc/devices/bgstrips-${sensor.id}/up" )
				|> aggregateWindow(every: ${periodQuery[1]}, fn: mean)`;

			this._influxService.runInfluxQuery(latestQuery).then((res: any) => {
				let dataset: any[] = [];
				let _dataset: any[] = [];

				if (res.length > 0) {
					if (i == 0) {
						let categories: any[] = [];
						let _categories: any[] = [];

						res.forEach((item, index) => {
							let category = {
								label: period != 'day'? this.getDateFormate(item._time) : (new Date(item._time)).getHours() + ":00"
							}

							let set = {
								value: item._value
							}

							categories.push(category);
							dataset.push(set);
						});

						_categories.push({  category: categories});
						_dataset.push({ seriesname: sensor.location, data: dataset });

						switch(sensorType) {
							case 'temperature':
								Object.assign(this.tempDataSource, { categories: _categories }, {	dataset: _dataset	});
								break;
							case 'humidity':
								Object.assign(this.humiDataSource, { categories: _categories }, {	dataset: _dataset	});
								break;
							case 'light':
								Object.assign(this.luxDataSource, { categories: _categories }, {	dataset: _dataset	});
								break;
						}
						
					} else {
						res.forEach((item, index) => {
							let set = {
								value: item._value
							}

							dataset.push(set);
						});

						switch(sensorType) {
							case 'temperature':
								if (this.tempDataSource.hasOwnProperty('dataset')) {
									this.tempDataSource.dataset.push({
										seriesname: sensor.location, data: dataset
									});
								}
								break;
							case 'humidity':
								if (this.humiDataSource.hasOwnProperty('dataset')) {
									this.humiDataSource.dataset.push({
										seriesname: sensor.location, data: dataset
									});
								}
								break;
							case 'light':
								if (this.luxDataSource.hasOwnProperty('dataset')) {
									this.luxDataSource.dataset.push({
										seriesname: sensor.location, data: dataset
									});
								}
								break;
						}
					}
				}

				this.tempLoading = true;
				this.humiLoading = true;
				this.luxLoading = true;
			});
		});
	}

	zoomChart(sensor: string) {
		// switch(sensor) {
		// 	case 'temperature':
		// 		console.log("temperature");
		// 		this.openZoomDialog(this.tempDataSource);
		// 		break;
		// 	case 'humidity':
		// 		break;
		// 	case 'light':
		// 		break;
		// }
	}

	// openZoomDialog(dataSource: any):void {
	// 	const dialogRef = this.chartZoomDialog.open(ZoomchartComponent, {
	// 		width:'800px',
	// 		data: {
	// 			animal: dataSource
	// 		}
	// 	});

 //    dialogRef.afterClosed().subscribe(
 //      data => console.log("Dialog output:", data)
 //    );    
	// }
}
