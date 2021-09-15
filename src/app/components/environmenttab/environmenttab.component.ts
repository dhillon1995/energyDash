import { Component, OnInit } from '@angular/core';

const data = {
  chart: {
    caption: "Todays Average temperature",
    yaxisname: "Number of units sold",
    subcaption: "2007-2016",
    legendposition: "Right",
    drawanchors: "0",
    showvalues: "0",
    plottooltext: "<b>$dataValue</b> iPhones sold in $label",
    theme: "fusion"
  },
  data: [
    {
      label: "2007",
      value: "1380000"
    },
    {
      label: "2008",
      value: "1450000"
    },
    {
      label: "2009",
      value: "1610000"
    },
    {
      label: "2010",
      value: "1540000"
    },
    {
      label: "2011",
      value: "1480000"
    },
    {
      label: "2012",
      value: "1573000"
    },
    {
      label: "2013",
      value: "2232000"
    },
    {
      label: "2014",
      value: "2476000"
    },
    {
      label: "2015",
      value: "2832000"
    },
    {
      label: "2016",
      value: "3808000"
    }
  ]
};

@Component({
  selector: 'app-environmenttab',
  templateUrl: './environmenttab.component.html',
  styleUrls: ['./environmenttab.component.css']
})

export class EnvironmenttabComponent implements OnInit {
  width = 600;
  height = 400;
  type = "area2d";
  dataFormat = "json";
  dataSource = data;

  constructor() { }

  ngOnInit(): void {
  }

}
