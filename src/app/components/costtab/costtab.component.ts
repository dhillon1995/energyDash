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
      caption: "Comparison of cost",
      yaxisname: "Costs in <b>£</b>",
      showhovereffect: "1",
      numberPrefix: "£",
      drawcrossline: "1",
      plottooltext: " <b>$seriesName</b> used <b>$dataValue</b> in $label",
      theme: "fusion"
    },
    data: [
      { label: '1st', value: 34.16329536},
      { label: '2nd', value: 21.8394344},
      { label: '3rd', value: 21.84225792},
      { label: '4th', value: 35.08019647},
      { label: '5th', value: 36.29110125}, 
      { label: '6th', value: 35.70547217},
      { label: '7th', value: 35.19107875},
      { label: '8th', value: 34.58264751},
      { label: '9th', value: 24.8269961},
      { label: '10th', value: 22.45625994},
      { label: '11th', value: 16.17792154},
      { label: '12th', value: 38.28357045},
      { label: '13th', value: 37.37884476},
      { label: '14th', value: 36.44870514},
      { label: '15th', value: 34.16329536},
      { label: '16th', value: 21.8394344},
      { label: '17th', value: 21.84225792},
      { label: '18th', value: 35.08019647},
      { label: '19th', value: 36.29110125},
      { label: '20th', value: 35.70547217},
      { label: '21th', value: 35.19107875},
      { label: '22th', value: 34.58264751},
      { label: '23th', value: 24.8269961},
      { label: '24th', value: 22.45625994},
      { label: '25th', value: 34.82148809}
    ]
  }

  totalLastMonth: number = 0.0;
  totalSoFarThisMonth: number = 0.0;
  totalProjectThisMonth: number = 0.0;

  constructor(private http: HttpClient, private _influxService: InfluxService) { }

  getDataHttp(url:string) {
    return this.http.get(url);
  }

  ngOnInit(): void {
    this.calcLastMonthCost();
    // this.calcSofarMonthCost();
    this.getTestData();
  }

  getTestData() {
    let total: number = 0;
    this.dataSource.data.forEach((item: any) => {
      total += item.value
    });
    this.totalSoFarThisMonth = Math.round((total + Number.EPSILON) * 100) / 100;

    this.totalProjectThisMonth = this.totalSoFarThisMonth + this.totalSoFarThisMonth / 25 * 5;
    this.totalProjectThisMonth = Math.round((this.totalProjectThisMonth + Number.EPSILON) * 100) / 100;
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