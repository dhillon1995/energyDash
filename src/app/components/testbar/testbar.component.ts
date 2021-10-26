import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"
import { DataStore } from 'fusioncharts';
import { DataSource } from '@angular/cdk/collections';


const data = {
  chart: {
    caption: "Costs over September",
    subcaption: "In MMbbl = One Million barrels",
    xaxisname: "Country",
    yaxisname: "Reserves (MMbbl)",
    numberPrefix: "£",
    upperlimit: "5",
    theme: "fusion"
  },
  data: [
    {
      label: "1st",
      value: "5.28"
    },
    {
      label: "2nd",
      value: "5.28"
    },
    {
      label: "3rd",
      value: "5.28"
    },
    {
      label: "4th",
      value: "5.28"
    },
    {
      label: "5th",
      value: "5.28"
    },
    {
      label: "6th",
      value: "5.28"
    },
    {
      label: "7th",
      value: "5.28"
    },
    {
      label: "8th",
      value: "5.28"
    },
    {
      label: "9th",
      value: "5.28"
    },
    {
      label: "10th",
      value: "5.28"
    },
    {
      label: "11th",
      value: "5.28"
    },
    {
      label: "12th",
      value: "5.28"
    },
    {
      label: "13th",
      value: "5.28"
    },
    {
      label: "14th",
      value: "5.28"
    },
    {
      label: "15th",
      value: "5.28"
    },
    {
      label: "16th",
      value: "5.28"
    },
    {
      label: "17th",
      value: "5.28"
    },
    {
      label: "18th",
      value: "5.28"
    },
    {
      label: "19th",
      value: "5.28"
    },
    {
      label: "20th",
      value: "5.28"
    },
    {
      label: "21th",
      value: "5.28"
    },
    {
      label: "22th",
      value: "5.28"
    },
    {
      label: "23th",
      value: "5.28"
    },
    {
      label: "24th",
      value: "5.28"
    },
    {
      label: "25th",
      value: "5.28"
    },
    {
      label: "26th",
      value: "5.28"
    },
    {
      label: "27th",
      value: "5.28"
    },
    {
      label: "28th",
      value: "5.28"
    },
    {
      label: "29th",
      value: "5.28"
    },
    {
      label: "30th",
      value: "5.28"
    }
  ]
};

@Component({
  selector: 'app-testbar',
  templateUrl: './testbar.component.html',
  styleUrls: ['./testbar.component.css']
})
export class TestbarComponent implements OnInit {

  width = 600;
  height = 400;
  type = "column2d";
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
    var dataTest = this.dataSource.data;
    var index = dataTest.findIndex(p => p.label == "1st");
   
    setTimeout(() => {  
       //never do this - I'm ashamed 
       this.dataSource.data[0]['value'] = this.newVar.tarrif_cost_total
       this.dataSource.data[1]['value'] = this.newVar.cost_sep2
       this.dataSource.data[2]['value'] = this.newVar.cost_sep3
       this.dataSource.data[3]['value'] = this.newVar.cost_sep4
       this.dataSource.data[4]['value'] = this.newVar.cost_sep5
       this.dataSource.data[5]['value'] = this.newVar.cost_sep6
       this.dataSource.data[6]['value'] = this.newVar.cost_sep7
       this.dataSource.data[7]['value'] = this.newVar.cost_sep8
       this.dataSource.data[8]['value'] = this.newVar.cost_sep9
       this.dataSource.data[9]['value'] = this.newVar.cost_sep10
       this.dataSource.data[10]['value'] = this.newVar.cost_sep11
       this.dataSource.data[11]['value'] = this.newVar.cost_sep12
       this.dataSource.data[12]['value'] = this.newVar.cost_sep13
       this.dataSource.data[13]['value'] = this.newVar.cost_sep14
       this.dataSource.data[14]['value'] = this.newVar.cost_sep15
       this.dataSource.data[15]['value'] = this.newVar.cost_sep16
       this.dataSource.data[16]['value'] = this.newVar.cost_sep17
       this.dataSource.data[17]['value'] = this.newVar.cost_sep18
       this.dataSource.data[18]['value'] = this.newVar.cost_sep19
       this.dataSource.data[19]['value'] = this.newVar.cost_sep20
       this.dataSource.data[20]['value'] = this.newVar.cost_sep21
       this.dataSource.data[21]['value'] = this.newVar.cost_sep22
       this.dataSource.data[22]['value'] = this.newVar.cost_sep23
       this.dataSource.data[23]['value'] = this.newVar.cost_sep24
       this.dataSource.data[24]['value'] = this.newVar.cost_sep25
       this.dataSource.data[25]['value'] = this.newVar.cost_sep26
       this.dataSource.data[26]['value'] = this.newVar.cost_sep27
       this.dataSource.data[27]['value'] = this.newVar.cost_sep28
       this.dataSource.data[28]['value'] = this.newVar.cost_sep29
       this.dataSource.data[29]['value'] = this.newVar.cost_sep30
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
  }
}
