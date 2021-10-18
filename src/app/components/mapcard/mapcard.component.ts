import { Component, OnInit } from '@angular/core';

const data = {
  colorrange: {
    gradient: "0",
    color: [
      {
        code: "#6da81e",
        minvalue: "0",
        maxvalue: "50",
        label: "Low Usage"
      },
      {
        code: "#f6bc33",
        minvalue: "50",
        maxvalue: "70",
        label: "Medium Usage"
      },
      {
        code: "#e24b1a",
        minvalue: "70",
        maxvalue: "85",
        label: "High Usage"
      },
      {
        code: "#ffffff",
        minvalue: "70",
        maxvalue: "85",
        label: "No Usage"
      }
    ]
  },
  dataset: [
    {
      data: [
        {
          rowid: "W1",
          columnid: "F",
          displayvalue: "1st",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "Sa",
          displayvalue: "2nd",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "Su",
          displayvalue: "3rd",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "M",
          displayvalue: "4th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "Tu",
          displayvalue: "5th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W2",
          columnid: "W",
          displayvalue: "6th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "Th",
          displayvalue: "7th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W2",
          columnid: "F",
          displayvalue: "8th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "Sa",
          displayvalue: "9th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W2",
          columnid: "Su",
          displayvalue: "10th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W3",
          columnid: "M",
          displayvalue: "11th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W3",
          columnid: "Tu",
          displayvalue: "12th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W3",
          columnid: "W",
          displayvalue: "13th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W3",
          columnid: "Th",
          displayvalue: "14th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W3",
          columnid: "F",
          displayvalue: "15th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W3",
          columnid: "Sa",
          displayvalue: "16th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W3",
          columnid: "Su",
          displayvalue: "17th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "M",
          displayvalue: "18th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "Tu",
          displayvalue: "19th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "W",
          displayvalue: "20th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "Th",
          displayvalue: "21st",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "F",
          displayvalue: "22nd",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "Sa",
          displayvalue: "23rd",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W4",
          columnid: "Su",
          displayvalue: "24th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "M",
          displayvalue: "25th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "Tu",
          displayvalue: "26th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "W",
          displayvalue: "27th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "Th",
          displayvalue: "28th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "F",
          displayvalue: "29th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "Sa",
          displayvalue: "30th",
          colorrangelabel: "No Usage"
        },
        {
          rowid: "W5",
          columnid: "Su",
          displayvalue: "31st",
          colorrangelabel: "No Usage"
        }
      ]
    }
  ],
  rows: {
    row: [
      {
        id: "W1",
        label: " "
      },
      {
        id: "W2",
        label: " "
      },
      {
        id: "W3",
        label: " "
      },
      {
        id: "W4",
        label: " "
      },
      {
        id: "W5",
        label: " "
      }
    ]
  },
  columns: {
    column: [
      {
        id: "M",
        label: "M"
      },
      {
        id: "Tu",
        label: "Tu"
      },
      {
        id: "W",
        label: "W"
      },
      {
        id: "Th",
        label: "Th"
      }
      ,
      {
        id: "F",
        label: "F"
      },
      {
        id: "Sa",
        label: "Sa"
      },
      {
        id: "Su",
        label: "Su"
      }
    ]
  },
  chart: {
    theme: "fusion",
    caption: "",
    subcaption: "",
    showvalues: "1",
    mapbycategory: "1",
    showlegend: "0",
    plottooltext:
      "Average consumption on the $displayvalue is $colorrangelabel"
  }
};


@Component({
  selector: 'app-mapcard',
  templateUrl: './mapcard.component.html',
  styleUrls: ['./mapcard.component.css']
})

export class MapcardComponent implements OnInit {
  width = 600;
  height = 400;
  type = "heatmap";
  dataFormat = "json";
  dataSource = data;

  constructor() { }

  ngOnInit(): void {
  }


}