import { Component, OnInit, Input } from '@angular/core';

const data = {
  chart: {
    caption: "",
    lowerlimit: "0",
    upperlimit: "300",
    showvalue: "0",
    numbersuffix: "kWh",
    theme: "fusion",
    baseFontSize: "10",
    showtooltip: "0",
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "75",
        code: "#6da81e"
      },
      {
        minvalue: "75",
        maxvalue: "200",
        code: "#f6bc33"
      },
      {
        minvalue: "200",
        maxvalue: "300",
        code: "#e24b1a"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "300"
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

  @Input() data: any;
  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {  
      data.dials.dial.push({value: this.data})
      data.dials.dial.shift();
     }, 2000);

  }

}
