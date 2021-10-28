import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfluxService } from '../../shared/services/influx.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-comparetab',
  templateUrl: './comparetab.component.html',
  styleUrls: ['./comparetab.component.css']
})

export class ComparetabComponent implements OnInit {
  type = "msline";
  dataFormat = "json";

  overallFields: Array<string> = [
    'D6F00034F12A8_CT22',
    'D6F00034F12A8_CT23',
    'D6F00034F12A8_CT24'
  ];

  dataSource: any = {
    chart: {
      caption: "Energy Consumption Cost of This Month",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Date in 2021",
      yAxisName: "Costs in <b>£</b>",
      numberPrefix: "£",
      theme: "fusion"
    },
    categories: [
      {
        category:[]
      }
    ],
    dataset:[
      {
        seriesname: "So far This Month",
        data: []
      }
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
    this.calcLastMonthPower();
    this.calcSofarMonthPower();
  }

  async calcLastMonthPower() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
    let total: any = 0.0;

    console.log(firstDay, lastDay);
    let range: string = `range(start: ${firstDay}, stop: ${lastDay})`;
    for(let i = 0; i < this.overallFields.length; i++) {
      let power:any  = await this.runQuery(range, this.overallFields[i]);
      total += power[0]._value;
    }

    total = total / 1000;
    this.totalLastMonth = Math.round((total + Number.EPSILON) * 100) / 100;
  }

  async calcSofarMonthPower() {
    let ranges: Array<string> = this.getSoFarMonthTimeRange();
    let totalSofar:number = 0.0;
    for (let i = 0; i < ranges.length; i++) {
      let power: number = await this.getPowerData(ranges[i]);
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

      let labelItem: any = {
        label: label,
      }

      this.dataSource.categories[0].category.push(labelItem);
      console.log(labelItem);
      let valueItem: any = {
        value: power / 1000,
      }
      console.log(valueItem);
      this.dataSource.dataset[0].data.push(valueItem);
      totalSofar += power;
    }

    totalSofar = totalSofar / 100000;
    this.totalSoFarThisMonth = Math.round((totalSofar + Number.EPSILON) * 100) / 100;
    this.calcprojectThisMonthCost();
  }

  calcprojectThisMonthCost() {
    let today = new Date();
    let currentDate = today.getDate();
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let lastDate = lastDayOfMonth.getDate();

    this.totalProjectThisMonth = this.totalSoFarThisMonth + (this.totalSoFarThisMonth/currentDate) * (lastDate - currentDate) ;
    this.totalProjectThisMonth = Math.round((this.totalProjectThisMonth + Number.EPSILON) * 100) / 100;
  }

  async getPowerData(range:string) {
    let total:number = 0.0;

    for (let i = 0; i < this.overallFields.length; i++) {
      let power: any = await this.runQuery(range, this.overallFields[i]);
      total += power[0]._value;
    }

    return total;
  }

  getSoFarMonthTimeRange() {
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

  runQuery(range: string, field: string) {
    const query = `|>${range}
                   |> filter(fn:(r) => r._field == "${field}")
                   |> sum(column: "_value")`;
    return  this._influxService.runInfluxQuery(query);
  }

}
