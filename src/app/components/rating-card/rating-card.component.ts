import { Component, OnInit } from '@angular/core';
import { InfluxService } from '../../shared/services/influx.service';
import { InfluxData }  from '../../shared/types/influxdata';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-rating-card',
  templateUrl: './rating-card.component.html',
  styleUrls: ['./rating-card.component.css']
})
export class RatingCardComponent implements OnInit {

  week_power: any;
  last_week_power: any;
  month_power: any;
  last_month_power: any;
  constructor(private _influxService: InfluxService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.calcThisWeekPower();
    this.calcThisMonthPower();
    //this.getTestData();
  }

  getTestData() {
    const query = `|> range(start: 2020-10-25T00:00:00.000Z, stop: 2020-10-26T19:00:36.596Z)
          |> filter(fn:(r) => r._field == "D6F00034F12A8_CT22")
          |> sum(column: "_value")`;
    this._influxService.runInfluxQuery(query).then((res:any) => {
      console.log("testestset");
      console.log(res);
    });
  }

  calcThisMonthPower() {
    let today = new Date();
    let firstDay = new Date(today.getFullYear(), today.getMonth(), 2);

    this.processInfluxData(firstDay.toISOString(), today.toISOString()).then((res:any) => {
      this.month_power = res;
    });

    let lastStart = new Date(firstDay);
    lastStart.setFullYear(lastStart.getFullYear() - 1);

    let lastEnd = new Date(today);
    lastEnd.setFullYear(lastEnd.getFullYear() - 1);

    console.log(lastStart.toISOString(), lastEnd.toISOString());
    this.processInfluxData(lastStart.toISOString(), lastEnd.toISOString()).then((res:any) => {
      this.last_month_power = res;
    });
  }

  calcThisWeekPower() {
    let today = new Date();
    let day = today.getDay();
    let startDay = this.getFirstDayofThisWeek(new Date());
    let _startDay = startDay.toISOString().slice(0, 10) + 'T00:00:00Z';
    let _endDay = today.toISOString();

    this.processInfluxData(_startDay, _endDay).then((res:any) => {
      this.week_power = res;
    });

    // Caculate this week of last year
    let lastStart = new Date(_startDay);
    lastStart.setFullYear(lastStart.getFullYear() - 1);

    let lastEnd = new Date(_endDay);
    lastEnd.setFullYear(lastEnd.getFullYear() - 1);

    this.processInfluxData(lastStart.toISOString(), lastEnd.toISOString()).then((res:any) => {
      this.last_week_power = res;
    });
  }

  async processInfluxData(start: string, end:string) {
    let dayCT22:any = await this.getCurrentUsageData(22, start, end);
    let dayCT23:any = await this.getCurrentUsageData(23, start, end);
    let dayCT24:any = await this.getCurrentUsageData(24, start, end);

    let dayCT22Data = dayCT22.length > 0 ? parseFloat(dayCT22[0]._value):0;
    let dayCT23Data = dayCT23.length > 0 ? parseFloat(dayCT23[0]._value):0;
    let dayCT24Data = dayCT24.length > 0 ? parseFloat(dayCT24[0]._value):0;

    return  ((dayCT22Data + dayCT23Data + dayCT24Data)/1000).toFixed(2);
  }

  getCurrentUsageData(num: number, start: string, end:string) {
    const query = `|> range(start: ${start}, stop: ${end})
          |> filter(fn:(r) => r._field == "D6F00034F12A8_CT${num}")
          |> sum(column: "_value")`;

    return  this._influxService.runInfluxQuery(query);
  }

  getFirstDayofThisWeek(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

}
