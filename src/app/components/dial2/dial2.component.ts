
import { Component, OnInit, Input } from '@angular/core';
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

  @Input() currentUsage: any;

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
    console.log("dial usage", this.currentUsage);
    data.dials.dial.push({value:this.currentUsage});
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