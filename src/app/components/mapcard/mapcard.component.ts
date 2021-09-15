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
      }
    ]
  },
  dataset: [
    {
      data: [
        {
          rowid: "W1",
          columnid: "M",
          displayvalue: "1st",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "Tu",
          displayvalue: "2nd",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "W",
          displayvalue: "3rd",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "Th",
          displayvalue: "4th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "F",
          displayvalue: "5th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W1",
          columnid: "Sa",
          displayvalue: "6th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W1",
          columnid: "Su",
          displayvalue: "7th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W2",
          columnid: "M",
          displayvalue: "8th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "Tu",
          displayvalue: "9th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W2",
          columnid: "W",
          displayvalue: "10th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "Th",
          displayvalue: "11th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W2",
          columnid: "F",
          displayvalue: "12th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W2",
          columnid: "Sa",
          displayvalue: "13th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W2",
          columnid: "Su",
          displayvalue: "14th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W3",
          columnid: "M",
          displayvalue: "15th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W3",
          columnid: "Tu",
          displayvalue: "16th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W3",
          columnid: "W",
          displayvalue: "17th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W3",
          columnid: "Th",
          displayvalue: "18th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W3",
          columnid: "F",
          displayvalue: "19th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W3",
          columnid: "Sa",
          displayvalue: "20th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W3",
          columnid: "Su",
          displayvalue: "21th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W4",
          columnid: "M",
          displayvalue: "22th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W4",
          columnid: "Tu",
          displayvalue: "23th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W4",
          columnid: "W",
          displayvalue: "24th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W4",
          columnid: "Th",
          displayvalue: "25th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W4",
          columnid: "F",
          displayvalue: "26th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W4",
          columnid: "Sa",
          displayvalue: "27th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W4",
          columnid: "Su",
          displayvalue: "28th",
          colorrangelabel: "High Usage"
        },
        {
          rowid: "W5",
          columnid: "M",
          displayvalue: "29th",
          colorrangelabel: "Medium Usage"
        },
        {
          rowid: "W5",
          columnid: "Tu",
          displayvalue: "30th",
          colorrangelabel: "Low Usage"
        },
        {
          rowid: "W5",
          columnid: "W",
          displayvalue: "31th",
          colorrangelabel: "Medium Usage"
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