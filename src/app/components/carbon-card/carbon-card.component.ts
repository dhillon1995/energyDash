import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import testData2 from "../../../assets/snapshot.json"


@Component({
  selector: 'app-carbon-card',
  templateUrl: './carbon-card.component.html',
  styleUrls: ['./carbon-card.component.css']
})
export class CarbonCardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  testVar: any = (testData2 as any);

  testVar2: any;

  testVar3: any;

  getDataHttp(url:string) {

    return this.http.get(url);
  }

  ngOnInit(): void {

    console.log("Carbon Card Init")

    this.testVar2 = JSON.parse(JSON.stringify(testData2));
    console.log("this is carbon test from Carbon Card, c02 Today is", this.testVar2.co2_today)

    let appInfo = "";
    this.getDataHttp('../assets/snapshot.json').subscribe(
      (data: any) => {
        var test = data;
        console.log("snapshot data: ", test);
        this.testVar3 = JSON.parse(JSON.stringify(test));
        console.log("this is testVar3", this.testVar3)
        console.log("this is testVar3", this.testVar3.power_now)
      }
    )

  }

}
