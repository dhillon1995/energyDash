import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//removal of file import test
//test

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

  costthisweek: any;

  exampleDataVar: any = (exampleData as any);

  newcosts: any;

  costnow: any;



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
        console.log("this week test",this.testVar3.power_thisweek)

        //This weeks costs calculations
        let y = 15.3022
        let x = parseInt(this.testVar3.power_thisweek)
        let z = x*y;
        let cost_thisweek = z/1000;
        this.newcosts = cost_thisweek.toFixed(2)
        //Current cost calculations
        let currentpower = parseInt(this.testVar3.power_now)
        let costnowlong = currentpower*y;
        let costnowdivided = costnowlong/100000;
        this.costnow = costnowdivided.toFixed(2)

        console.log("costnow", this.costnow)

      }
    )

    


  }



}
