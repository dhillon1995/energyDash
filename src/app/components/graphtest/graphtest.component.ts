import { Component, OnInit } from '@angular/core';

const data = {
  colorrange: {
    gradient: "0",
    color: [
      {
        code: "#6da81e",
        minvalue: "0",
        maxvalue: "50",
        label: "Freezing"
      },
      {
        code: "#f6bc33",
        minvalue: "50",
        maxvalue: "70",
        label: "Warm"
      },
      {
        code: "#e24b1a",
        minvalue: "70",
        maxvalue: "85",
        label: "Hot"
      }
    ]
  },
  dataset: [
    {
      data: [
        {
          rowid: "LA",
          columnid: "WI",
          displayvalue: "60.1",
          colorrangelabel: "Warm"
        },
        {
          rowid: "LA",
          columnid: "SP",
          displayvalue: "64.5",
          colorrangelabel: "Warm"
        },
        {
          rowid: "LA",
          columnid: "SU",
          displayvalue: "68.2",
          colorrangelabel: "Warm"
        },
        {
          rowid: "LA",
          columnid: "AU",
          displayvalue: "65.7",
          colorrangelabel: "Warm"
        },
        {
          rowid: "NY",
          columnid: "WI",
          displayvalue: "33.7",
          colorrangelabel: "Freezing"
        },
        {
          rowid: "NY",
          columnid: "SP",
          displayvalue: "57.8",
          colorrangelabel: "Warm"
        },
        {
          rowid: "NY",
          columnid: "SU",
          displayvalue: "74.49",
          colorrangelabel: "Hot"
        },
        {
          rowid: "NY",
          columnid: "AU",
          displayvalue: "57.6",
          colorrangelabel: "Warm"
        },
        {
          rowid: "CH",
          columnid: "WI",
          displayvalue: "22.89",
          colorrangelabel: "Freezing"
        },
        {
          rowid: "CH",
          columnid: "SP",
          displayvalue: "55.7",
          colorrangelabel: "Warm"
        },
        {
          rowid: "CH",
          columnid: "SU",
          displayvalue: "72.2",
          colorrangelabel: "Hot"
        },
        {
          rowid: "CH",
          columnid: "AU",
          displayvalue: "51.6",
          colorrangelabel: "Warm"
        },
        {
          rowid: "HO",
          columnid: "WI",
          displayvalue: "53.0",
          colorrangelabel: "Warm"
        },
        {
          rowid: "HO",
          columnid: "SP",
          displayvalue: "72.7",
          colorrangelabel: "Hot"
        },
        {
          rowid: "HO",
          columnid: "SU",
          displayvalue: "83.3",
          colorrangelabel: "Hot"
        },
        {
          rowid: "HO",
          columnid: "AU",
          displayvalue: "53.0",
          colorrangelabel: "Warm"
        }
      ]
    }
  ],
  columns: {
    column: [
      {
        id: "WI",
        label: "Winter"
      },
      {
        id: "SU",
        label: "Summer"
      },
      {
        id: "SP",
        label: "Spring"
      },
      {
        id: "AU",
        label: "Autumn"
      }
    ]
  },
  rows: {
    row: [
      {
        id: "NY",
        label: "New York"
      },
      {
        id: "LA",
        label: "Los Angeles"
      },
      {
        id: "CH",
        label: "Chicago"
      },
      {
        id: "HO",
        label: "Houston"
      }
    ]
  },
  chart: {
    theme: "fusion",
    caption: "",
    subcaption: "",
    showvalues: "1",
    mapbycategory: "1",
    plottooltext:
      "$rowlabel's average temperature in $columnlabel is $displayvalue °F"
  }
};


@Component({
  selector: 'app-graphtest',
  templateUrl: './graphtest.component.html',
  styleUrls: ['./graphtest.component.css']
})

export class GraphtestComponent implements OnInit {
  width = 600;
  height = 400;
  type = "heatmap";
  dataFormat = "json";
  dataSource = data;

  constructor() { }

  ngOnInit(): void {
  }


}