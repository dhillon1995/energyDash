import { Component, OnInit } from '@angular/core';

const data = {
  chart: {
    caption: "",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "fusion",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F"
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533"
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "81"
      }
    ]
  }
};

@Component({
  selector: 'app-dialtest',
  templateUrl: './dialtest.component.html',
  styleUrls: ['./dialtest.component.css']
})

export class DialtestComponent implements OnInit {
  width = 600;
  height = 400;
  type = "angulargauge";
  dataFormat = "json";
  dataSource = data;

  constructor() { }

  ngOnInit(): void {
  }

}
