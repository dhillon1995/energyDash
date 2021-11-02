import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { InfluxService } from '../../shared/services/influx.service';

@Component({
	selector: 'app-mapcard',
	templateUrl: './mapcard.component.html',
	styleUrls: ['./mapcard.component.css']
})

export class MapcardComponent implements OnInit {
	overallFields: Array<string> = [
    'D6F00034F12A8_CT22',
    'D6F00034F12A8_CT23',
    'D6F00034F12A8_CT24'
  ];

	option:EChartsOption = {
		tooltip: {
			position: 'top',
	    axisPointer: {
	      type: "shadow",
	    },
	    formatter: (params) => {
	      return `Power: ${params.value[1]} kWh<br />`;
	    },
		},
		visualMap: {
			min: 0,
			max: 600,
			orient: 'horizontal',
			left: 'center',
			top: 30,
			calculable: true,
		},
		calendar: {
			orient: 'vertical',
			yearLabel: {
				show: false
			},
			monthLabel: {
				show: true
			},
			itemStyle: {
				borderWidth:0.1,
				borderColor: '#5470c6'
			},
			dayLabel: {
				firstDay: 1,
				nameMap: 'cn',
				show: true
			},
			cellSize: 40,
			left: 40,
			top: 120
		}   
	};

	initOpts = {
		width: 350,
		height: 350
	};

	loading: boolean = false;

	constructor(private _influxService: InfluxService) { }

	ngOnInit(): void {
		//this.getVirtulData();
		this.getTestData();
	}

	getTestData() {
		// const query = ` |> range(start: 2021-11-02T00:00:00Z, stop: 2021-11-02T15:02:05.610Z)
  //                  	|> filter(fn:(r) => r._field == "D6F00034F12A8_CT22" or
  //                  		 r._field == "D6F00034F12A8_CT23" or
  //                  		 r._field == "D6F00034F12A8_CT24" or
  //                  		 r._field == "D6F00034F12A8_CT21")
  //                  	|> hourSelection(start:7, stop:23)
  //                  	|> aggregateWindow(every: 1m, fn: sum, column: "_value")`;
    const query = `|> range(start: 2021-11-02T00:00:00Z, stop: 2021-11-02T15:15:01.460Z)
                   |> filter(fn:(r) => r._field == "D6F00034F12A8_CT1" or r._field == "D6F00034F12A8_CT2" or r._field == "D6F00034F12A8_CT4" or r._field == "D6F00034F12A8_CT7" or r._field == "D6F00034F12A8_CT8" or r._field == "D6F00034F12A8_CT9" or r._field == "D6F00034F12A8_CT10" or r._field == "D6F00034F12A8_CT11" or r._field == "D6F00034F12A8_CT12" or r._field == "D6F00034F12A8_CT13" or r._field == "D6F00034F12A8_CT14" or r._field == "D6F00034F12A8_CT15" or r._field == "D6F00034F12A8_CT16" or r._field == "D6F00034F12A8_CT17" or r._field == "D6F00034F12A8_CT19" or r._field == "D6F00034F12A8_CT20" or r._field == "D6F00034F12A8_CT21" or r._field == "D6F00034F12A8_CT22" or r._field == "D6F00034F12A8_CT23" or r._field == "D6F00034F12A8_CT24" or r._field == "D6F00034F12A8_CT25" or r._field == "D6F00034F12A8_CT26" or r._field == "D6F00034F12A8_CT27" or r._field == "D6F00034F12A8_CT28" or r._field == "D6F00034F12A8_CT29")
                   |> aggregateWindow(every: 1m, fn: sum, column: "_value")
                   |> group(columns: ["_field"], mode:"by")`;
    this._influxService.runInfluxQuery(query).then((res:any) => {
    	console.log("this is sum test");
    	console.log(res);
    });
	}

	getDaysSoFarMonth() {
		let _date = new Date()
		let firstDay = new Date(_date.getFullYear(), _date.getMonth() , 2).toISOString().slice(0, 10);
		let date = new Date(firstDay); 
		let month = date.getMonth();
		let days: Array<string> = [];
		Object.assign(this.option.calendar, {range: firstDay.slice(0, 7)});
		
		while (date.getMonth() === month) {
			days.push(new Date(date).toISOString());
			date.setDate(date.getDate() + 1);
		}

		return days;
	}

	async getVirtulData() {
		let date = new Date();
		let firstDay = new Date(date.getFullYear(), date.getMonth(), 0); firstDay.setDate(firstDay.getDate() + 1);
		let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); lastDay.setDate(lastDay.getDate() + 1);
		let seriesData: Array<string> = [];
		let range = `range(start: ${firstDay.toISOString().slice(0,10)}, stop: ${lastDay.toISOString().slice(0,10)})`;
		let daysData: Array<string> = this.getDaysSoFarMonth();
		let power: any = await this.getPowerData(range);

		console.log(range);
		daysData.forEach((item:string, index:number) => {
			let dataItem: any = [
				item.slice(0, 10),
				Math.round((power[index]/1000 + Number.EPSILON) * 100) / 100
			];
			seriesData.push(dataItem);
		})
		
	
		let seriesObject: any = {
			type: 'effectScatter',
			coordinateSystem: 'calendar',
			symbolSize: function (val) {
				return val[1]/ 10;
			},
			label: {
				show: true,
				color: "blue",
				formatter: function (params) {
					return params.data[0].slice(8, 10);
				},
			},
			data: seriesData
		}

		Object.assign(this.option, {series: seriesObject});
		this.loading = true;
	}

  async getPowerData(range:string) {
    let total:any = [];

    for (let i = 0; i < this.overallFields.length; i++) {
      let power: any = await this.runQuery(range, this.overallFields[i]);

      if (i == 0) {
      	power.forEach((item:any, i:number) => {
      		if (item._value !== null) {
      			total.push(item._value);
      		} else {
      			total.push(0)
      		}
      	});
      } else {
      	power.forEach((item:any, i:number) => {
      		if (item._value !== null) {
      			total[i] = total[i] + item._value;
      		}
      	});
      }
    }

    return total;
  }

  runQuery(range: string, field: string) {
    const query = `|> ${range}
                   |> filter(fn:(r) => r._field == "${field}")
                   |> aggregateWindow(every: 1d, fn: sum, column: "_value")`;
    return  this._influxService.runInfluxQuery(query);
  }
}