import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costtab',
  templateUrl: './costtab.component.html',
  styleUrls: ['./costtab.component.css']
})


export class CosttabComponent implements OnInit {
  dataSource: Object;
  constructor() {
    //STEP 2 - Chart Data
    const chartData = [
      {
        label: "1st Feb 2021",
        value: "290"
      },
      {
        label: "2nd Feb 2021",
        value: "260"
      },
      {
        label: "3rd Feb 2021",
        value: "180"
      },
      {
        label: "4th Feb 2021",
        value: "140"
      },
      {
        label: "5th Feb 2021",
        value: "115"
      },
      {
        label: "6th Feb 2021",
        value: "100"
      },
      {
        label: "7th Feb 2021",
        value: "30"
      },
      {
        label: "8th Feb 2021",
        value: "180"
      },
      {
        label: "9th Feb 2021",
        value: "260"
      },
      {
        label: "10th Feb 2021",
        value: "30"
      },
      {
        label: "11th Feb 2021",
        value: "115"
      },
      {
        label: "12th Feb 2021",
        value: "180"
      },
      {
        label: "13th Feb 2021",
        value: "30"
      },
      {
        label: "14th Feb 2021",
        value: "115"
      },
      {
        label: "15th Feb 2021",
        value: "180"
      },
      {
        label: "16th Feb 2021",
        value: "30"
      },
      {
        label: "17th Feb 2021",
        value: "260"
      },
      {
        label: "18th Feb 2021",
        value: "30"
      },
      {
        label: "19th Feb 2021",
        value: "180"
      },
      {
        label: "21st Feb 2021",
        value: "30"
      },
      {
        label: "22nd Feb 2021",
        value: "260"
      },
      {
        label: "23rd Feb 2021",
        value: "30"
      },
      {
        label: "24nd Feb 2021",
        value: "180"
      },
      {
        label: "25nd Feb 2021",
        value: "30"
      },
      {
        label: "26nd Feb 2021",
        value: "180"
      },
      {
        label: "27nd Feb 2021",
        value: "30"
      },
      {
        label: "28nd Feb 2021",
        value: "260"
      }
    ];

    // STEP 3 - Chart Configuration
    const dataSource = {
      chart: {
        //Set the chart caption
        caption: "Energy Consumption Cost of This Month",
        //Set the chart subcaption
        subCaption: "February 2017",
        //Set the x-axis name
        xAxisName: "Date",
        //Set the y-axis name
        yAxisName: "Costs in $",
        numberSuffix: "$",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: chartData
    };
    this.dataSource = dataSource;
  }
  ngOnInit(): void {
  }
}