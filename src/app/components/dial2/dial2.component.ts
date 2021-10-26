
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"




@Component({
  selector: 'app-dial2',
  templateUrl: './dial2.component.html',
  styleUrls: ['./dial2.component.css']
})

export class Dial2Component implements OnInit {
  width = 600;
  height = 400;
  type = "angulargauge";
  dataFormat = "json";
  dataSource = data;

  constructor(private http: HttpClient) { }

  testVar: any = (testData2 as any);

  testVar2: any;

  newVar: any;

  exampleDataVar: any = (exampleData as any);

  dialvalue: any = "89";

  getDataHttp(url:string) {

    return this.http.get(url);
  }

  ngOnInit(): void {
    setTimeout(() => {  
      data.dials.dial.push({value: this.newVar.power_nowDial})
      data.dials.dial.shift();
     }, 2000);

    this.testVar2 = JSON.parse(JSON.stringify(testData2));

    let appInfo = "";
    this.getDataHttp('../assets/snapshot.json').subscribe(
      (data: any) => {
        var test = data;
        this.newVar = JSON.parse(JSON.stringify(test));
        //this.dialtestnum = 300//this.newVar.power_today2
      }
    )

    //console.log("object tests", data.dials.dial)
    const jsontest =  {
      test: [{
        test1 : "this is a string"
      }]
    }
    //console.log(jsontest)
    //console.log(jsontest.test[0])

    //jsontest.test.push({test1:"test string new"}) 
    //console.log(jsontest.test)
    //jsontest.test.shift();
   //Object.assign(jsontest.test, { test1 : "new" })

    //console.log(jsontest.test)

    data.dials.dial.push({value:this.newVar.power_now})
    data.dials.dial.shift();
    //data.dials.dial.shift();
    //console.log("object test position 0", data.dials.dial[0])
    //console.log("object test init end", data.dials)

  }

}

const data = {
  chart: {
    caption: "",
    lowerlimit: "0",
    upperlimit: "500",
    showvalue: "0",
    numbersuffix: "W",
    theme: "fusion",
    placeValuesInside: "1",
    labelposition: "inside",
    baseFontSize: "10",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "150",
        code: "#6da81e"
      },
      {
        minvalue: "150",
        maxvalue: "375",
        code: "#f6bc33"
      },
      {
        minvalue: "375",
        maxvalue: "500",
        code: "#e24b1a"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "500"
      }
    ]
  }
};