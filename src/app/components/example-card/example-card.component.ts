import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import testData from "../../../../../dataTest/dataTest.json"
import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"

@Component({
  selector: 'app-example-card',
  templateUrl: './example-card.component.html',
  styleUrls: ['./example-card.component.css']
})
export class ExampleCardComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  testVar: any = (testData2 as any);

  testVar2: any;

  testVar3: any;

  exampleDataVar: any = (exampleData as any);



  getDataHttp(url:string) {

    return this.http.get(url);
  }


  ngOnInit(): void {

    console.log("breakdown Init")

    this.testVar2 = JSON.parse(JSON.stringify(testData2));
    console.log("this is a power now test from testVar3", this.testVar2.power_now)
    console.log("this is a power now test from exampleData", this.exampleDataVar.power_now)

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
