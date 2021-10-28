import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfluxService } from '../../shared/services/influx.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-costtab',
  templateUrl: './costtab.component.html',
  styleUrls: ['./costtab.component.css']
})

export class CosttabComponent implements OnInit {

  overallFields: Array<string> = [
    'D6F00034F12A8_CT22',
    'D6F00034F12A8_CT23',
    'D6F00034F12A8_CT24'
  ];

  dataSource:any = {
    chart: {
      caption: "Energy Consumption Cost of This Month",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Date in 2021",
      yAxisName: "Costs in <b>£</b>",
      numberPrefix: "£",
      theme: "fusion"
    },
    data: []
  }
// caption: "Costs over September",
//     subcaption: "In MMbbl = One Million barrels",
//     xaxisname: "Country",
//     yaxisname: "Reserves (MMbbl)",
//     numberPrefix: "£",
//     upperlimit: "5",
//     theme: "fusion"
  totalLastMonth: number = 0.0;
  totalSoFarThisMonth: number = 0.0;
  totalProjectThisMonth: number = 0.0;

  constructor(private http: HttpClient, private _influxService: InfluxService) { }

  getDataHttp(url:string) {
    return this.http.get(url);
  }

  ngOnInit(): void {
    this.calcLastMonthCost();
    this.calcSofarMonthCost();
    this.getTestData();
  }

  getTestData() {
    const query = `|> range(start: 2021-10-01T00:00:00Z, stop: 2021-10-26T23:00:00Z)
                   |> filter(fn:(r) => r._field == "D6F00034F12A8_CT23")
                   |> hourSelection(start: 7, stop: 23)
                   |> aggregateWindow(every: 1d, fn: sum)
                   |> cumulativeSum(columns: ["_value"])`;
    this._influxService.runInfluxQuery(query).then((res:any) => {
      console.log(res);
    });
  }

  calcprojectThisMonthCost() {
    let today = new Date();
    let currentDate = today.getDate();
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let lastDate = lastDayOfMonth.getDate();

    this.totalProjectThisMonth = this.totalSoFarThisMonth + (this.totalSoFarThisMonth/currentDate) * (lastDate - currentDate) ;
    this.totalProjectThisMonth = Math.round((this.totalProjectThisMonth + Number.EPSILON) * 100) / 100;
  }

  async calcLastMonthCost() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
    let total: any = 0.0;

    console.log(firstDay, lastDay);
    let range: string = `range(start: ${firstDay}, stop: ${lastDay})`;
    for(let i = 0; i < this.overallFields.length; i++) {
      let nightPower:any  = await this.runQuery(range, this.overallFields[i], false);
      let dayPower:any  = await this.runQuery(range, this.overallFields[i], true);
      total += nightPower[0]._value * environment.nightTariff + dayPower[0]._value * environment.dayTariff;
    }

    total = total / 100000;
    this.totalLastMonth = Math.round((total + Number.EPSILON) * 100) / 100;
  }

  async calcSofarMonthCost() {
    let ranges: Array<string> = this.getSoFarMonthTimeRange();
    let totalSofar:number = 0.0;
    for (let i = 0; i < ranges.length; i++) {
      let cost: number = await this.getCostData(ranges[i]);
      let label: string;

      if (i == 0) {
        label = '1st';
      } else if ( i == 1) {
        label = '2nd';
      } else if ( i == 2) {
        label = '3rd';
      } else {
        label = i + 1 + 'th';
      }
      let chartItem: any = {
        label: label,
        value: cost /100000
      }

      this.dataSource.data.push(chartItem);
      totalSofar += cost;
    }
    totalSofar = totalSofar / 100000;
    this.totalSoFarThisMonth = Math.round((totalSofar + Number.EPSILON) * 100) / 100;
    this.calcprojectThisMonthCost();
  }

  async getCostData(range:string) {
    let total:number = 0.0;

    for (let i = 0; i < this.overallFields.length; i++) {
      let nightPower: any = await this.runQuery(range, this.overallFields[i], false);
      let dayPower: any = await this.runQuery(range, this.overallFields[i], true);

      total += nightPower[0]._value * environment.nightTariff + dayPower[0]._value * environment.dayTariff;
    }

    return total;
  }

  runQuery(range: string, field: string, isDay:boolean) {
    let query: any;

    if (isDay) {
      query = `|>${range}
               |> filter(fn:(r) => r._field == "${field}")
               |> hourSelection(start:7, stop:23)
               |> sum(column: "_value")`;
    } else {
      query = `|>${range}
               |> filter(fn:(r) => r._field == "${field}")
               |> hourSelection(start:0, stop:7)
               |> sum(column: "_value")`;
    }
    return  this._influxService.runInfluxQuery(query);
  }

  getSoFarMonthTimeRange() {
    // let firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    // let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
    let days: Array<string> = this.getDaysSoFarMonth();
    let ranges: any = [];

    days.forEach((item:string) => {
      ranges.push(
        `range(start: ${item}, stop: ${item.slice(0, 10)}T23:59:59Z)`,
      );
    });

    return ranges;
  }

  getDaysSoFarMonth() {
    let _date = new Date()
    let firstDay = new Date(_date.getFullYear(), _date.getMonth(), 2).toISOString().slice(0, 10);
    let date = new Date(firstDay); 
    let month = date.getMonth();
    let days: Array<string> = [];

    while (date.getMonth() === month && date <= _date) {
      days.push(new Date(date).toISOString());
      date.setDate(date.getDate() + 1);
    }

    return days;
  }
}