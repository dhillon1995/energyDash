import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import exampleData from "../../../assets/snapshotExample.json"
import testData2 from "../../../assets/snapshot.json"


@Component({
  selector: 'app-costtab',
  templateUrl: './costtab.component.html',
  styleUrls: ['./costtab.component.css']
})


export class CosttabComponent implements OnInit {
  
  dataSource: Object;

  constructor(private http: HttpClient) {
    
    //STEP 2 - Chart Data
    const chartData = [
      {
        label: "1st Feb",
        value: "290"
      },
      {
        label: "2nd Feb",
        value: "260"
      },
      {
        label: "3rd Feb",
        value: "180"
      },
      {
        label: "4th Feb",
        value: "140"
      },
      {
        label: "5th Feb",
        value: "115"
      },
      {
        label: "6th Feb",
        value: "100"
      },
      {
        label: "7th Feb",
        value: "30"
      },
      {
        label: "8th Feb",
        value: "180"
      },
      {
        label: "9th Feb",
        value: "260"
      },
      {
        label: "10th Feb",
        value: "30"
      },
      {
        label: "11th Feb",
        value: "115"
      },
      {
        label: "12th Feb",
        value: "180"
      },
      {
        label: "13th Feb",
        value: "30"
      },
      {
        label: "14th Feb",
        value: "115"
      },
      {
        label: "15th Feb",
        value: "180"
      },
      {
        label: "16th Feb",
        value: "30"
      },
      {
        label: "17th Feb",
        value: "260"
      },
      {
        label: "18th Feb",
        value: "30"
      },
      {
        label: "19th Feb",
        value: "180"
      },
      {
        label: "21st Feb",
        value: "30"
      },
      {
        label: "22nd Feb",
        value: "260"
      },
      {
        label: "23rd Feb",
        value: "30"
      },
      {
        label: "24nd Feb",
        value: "180"
      },
      {
        label: "25nd Feb",
        value: "30"
      },
      {
        label: "26nd Feb",
        value: "180"
      },
      {
        label: "27nd Feb",
        value: "30"
      },
      {
        label: "28nd Feb",
        value: "260"
      }
    ];

    // STEP 3 - Chart Configuration
    const dataSource = {
      chart: {
        //Set the chart caption
        caption: "Energy Consumption Cost of This Month",
        //Set the chart subcaption
        subCaption: "February 2021",
        //Set the x-axis name
        xAxisName: "Date in 2021",
        //Set the y-axis name
        yAxisName: "Costs in <b>£</b>",
        numberPrefix: "£",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: chartData
    };
    this.dataSource = dataSource;
  }

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
      //console.log("object test position 0", data.dials.dial[0])
     // console.log("power_now 2", this.newVar.power_nowDial)
     // data.dials.dial.push({value: this.newVar.power_nowDial})
     // data.dials.dial.shift();
      //console.log("object test 2", data.dials.dial)
     // console.log("power_now 2", this.newVar.power_nowDial)
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