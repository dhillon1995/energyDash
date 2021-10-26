import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"

const data = {
  chart: {
    caption: "Appliance power usage",
    yaxisname: "Power usage in W",
    aligncaptionwithcanvas: "0",
    numbersuffix: "W",
    plottooltext: "$label used <b>$dataValue</b>",
    theme: "fusion"
  },
  data: [
    {
      label: "Lights",
      value: "41"
    },
    {
      label: "Kitchen",
      value: "39"
    },
    {
      label: "MB Ports",
      value: "38"
    },
    {
      label: "Electrack",
      value: "32"
    },
    {
      label: "Air Conditioning",
      value: "26"
    },
    {
      label: "Main Office",
      value: "2500"
    },
    {
      label: "Service Room",
      value: "2000"
    }
  ]
};

@Component({
  selector: 'app-appliancestab',
  templateUrl: './appliancestab.component.html',
  styleUrls: ['./appliancestab.component.css']
})

export class AppliancestabComponent implements OnInit {
  width = 600;
  height = 400;
  type = "bar2d";
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

    //var dataTest = this.dataSource.data;

    //var index = dataTest.findIndex(p => p.label == "1st");
    
    setTimeout(() => {  
       //never do this - I'm ashamed 
       this.dataSource.data[0]['value'] = this.newVar.lights_today2
       this.dataSource.data[1]['value'] = this.newVar.kitchen_today2
       this.dataSource.data[2]['value'] = this.newVar.sockets_today2
       this.dataSource.data[3]['value'] = this.newVar.electrack_today2
       this.dataSource.data[4]['value'] = this.newVar.ac_today2
     }, 2000);

    this.testVar2 = JSON.parse(JSON.stringify(testData2));

    let appInfo = "";
    this.getDataHttp('../assets/snapshot.json').subscribe(
      (data: any) => {
        var test = data;
        this.newVar = JSON.parse(JSON.stringify(test));
      }
    )
  }

}
