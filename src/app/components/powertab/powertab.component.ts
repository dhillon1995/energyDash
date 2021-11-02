import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfluxService } from '../../shared/services/influx.service';

interface Period {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-powertab',
  templateUrl: './powertab.component.html',
  styleUrls: ['./powertab.component.css']
})
export class PowertabComponent implements OnInit {

  url: string = "https://www.knowatts.co.uk/Power+Manager+Dashboard";
  urlSafe: SafeResourceUrl
  powerData: any = [
    { field: 'D6F00034F12A8_CT1', label: 'Kitchen 2' },
    { field: 'D6F00034F12A8_CT2', label: 'Kitchen 1' },
    { field: 'D6F00034F12A8_CT4', label: 'MDB Port 2' },
    { field: 'D6F00034F12A8_CT7', label: 'MB1 Port 5' },
    { field: 'D6F00034F12A8_CT8', label: 'MB1 Port 6' },
    { field: 'D6F00034F12A8_CT9', label: 'MB2 Port 1' },
    { field: 'D6F00034F12A8_CT10', label: 'MB2 Port 2' },
    { field: 'D6F00034F12A8_CT11', label: 'MB2 Port 3' },
    { field: 'D6F00034F12A8_CT12', label: 'ELECTRAK 1' },
    { field: 'D6F00034F12A8_CT13', label: 'ELECTRAK 2' },
    { field: 'D6F00034F12A8_CT14', label: 'ELECTRAK 3' },
    { field: 'D6F00034F12A8_CT15', label: 'ELECTRAK 4' },
    { field: 'D6F00034F12A8_CT16', label: 'ELECTRAK 5' },
    { field: 'D6F00034F12A8_CT17', label: 'A/C Roof Comms Room' },
    { field: 'D6F00034F12A8_CT19', label: 'Main Incomer Brown' },
    { field: 'D6F00034F12A8_CT20', label: 'Main Incomer Black' },
    { field: 'D6F00034F12A8_CT21', label: 'Main Incomer Grey' },
    { field: 'D6F00034F12A8_CT22', label: 'LCM 412 & 411' },
    { field: 'D6F00034F12A8_CT23', label: 'LCM 40E & 40D' },
    { field: 'D6F00034F12A8_CT24', label: 'LCM 400 & 40F' },
    { field: 'D6F00034F12A8_CT25', label: 'LCM 40B & 403' },
    { field: 'D6F00034F12A8_CT26', label: 'LCM 404 & 40C' },
    { field: 'D6F00034F12A8_CT27', label: 'LCM 405, 406 & 407' },
    { field: 'D6F00034F12A8_CT28', label: 'LCM 40A & 402' },
    { field: 'D6F00034F12A8_CT29', label: 'LCM 400 & 408' },
    { field: 'D6F00034F12A8_F1', label: 'Frequency 1' },
    { field: 'D6F00034F12A8_F2', label: 'Frequency 2' },
    { field: 'D6F00034F12A8_F3', label: 'Frequency 3' },
    { field: 'D6F00034F12A8_V1', label: 'Voltage 1' },
    { field: 'D6F00034F12A8_V2', label: 'Voltage 2' },
    { field: 'D6F00034F12A8_V3', label: 'Voltage 3' }
  ];

  option: any = {
    title: {
      left: 'center',
      text: 'Brook Green - today'
    },
    tooltip: {
      position: 'top'
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (function(value){
          let label;
          let date = new Date(value);
          if (date.getMinutes() < 10){ 
            label = date.getHours() + ":0" +date.getMinutes();
          }
          else {
            label = date.getHours() + ":" +date.getMinutes();
          }
          return label;
        })
      }
    },
    yAxis: [
      {
        type: 'value',
        name: 'Voltage',
        min: 0,
        max: 400,
        axisLabel: {
          formatter: '{value}V'
        },
      },
      {
        type: 'value',
        name: 'Frequency',
        min: 0,
        max: 80,
        offset: 65,
        position: 'left',
        axisLabel: {
          formatter: '{value}Hz'
        }
      },
      {
        type: 'value',
        name: 'Power',
        min: 0,
        max: 200,
        offset: 125,
        position: 'left',
        axisLabel: {
          formatter: '{value}Wh',
        }
      },
    ],
    grid: {
      bottom: '30%',
      left: '20%'
    },
    legend: {
      bottom: '0',
      data: [],
      borderColor: '#ccc' ,
      borderWidth: 0.5 ,
      borderRadius: 5,
    },
    series: []
  }

  initOpts = {
    width: 1000,
    height: 500
  };

  loading: boolean = false;

  periods: Period[] = [
    {value: 'steak-0', viewValue: 'So far this week'},
    {value: 'pizza-1', viewValue: 'last 6 hours'},
    {value: 'tacos-2', viewValue: 'Last 2 days'},
    {value: 'tacos-2', viewValue: 'Month'},
    {value: 'tacos-2', viewValue: 'Year'},
  ];

  constructor(private _influxService: InfluxService) { }

  ngOnInit(): void {
    this.getCTData();
  }

  async getCTData() {
    let range: string = this.getRange();
    let field = '';

    for (let i = 0; i < this.powerData.length; i++) {
      if (i == this.powerData.length - 1) {
        field += `r._field == "${this.powerData[i].field}"`;
      } else {
        field += `r._field == "${this.powerData[i].field}" or `;
      }
    }

    let power: any = await this.runQuery(range, field);
    let legendData: Array<string> = [];
    let xAxisData: Array<string> = [];
    let name: string = this.powerData[0].label;
    let seriesData: any = [];

    power.map((item:any) => {
      let label = this.powerData.find((pl:any) => pl.field == item._field);
      let findObject = seriesData.find((p:any) => p.name == label.label);

      if (findObject) {
        findObject.data.push([item._time, item._value])
      } else {
        if (label.label.includes('Frequency')) {
          seriesData.push({
            name: label.label,
            data:[[item._time, item._value]],
            symbolSize: 0.1,
            yAxisIndex: 1,
            type: 'line'
          });
        } else if (label.label.includes('Voltage')) {
          seriesData.push({
            name: label.label,
            data:[[item._time, item._value]],
            symbolSize: 0.1,
            type: 'line'
          });
        } else {
          seriesData.push({
            name: label.label,
            data:[[item._time, item._value]],
            symbolSize: 0.1,
            yAxisIndex: 2,
            type: 'line'
          });
        }
      }
    });

    seriesData.map((item:any) => {
      legendData.push(item.name);
    });
    this.loading = true;
    this.option.series = seriesData;
    console.log(seriesData);
    this.option.legend.data = legendData;
    console.log(this.option);
  }

  getRange() {
    let today = new Date();
    let start = today.toISOString().slice(0, 10) + 'T00:00:00Z';
    let end = today.toISOString();
    
    return `range(start: ${start}, stop: ${end})`;
  }

  runQuery(range: string, field: string) {
    const query = `|> ${range}
                   |> filter(fn:(r) => ${field})
                   |> aggregateWindow(every: 1m, period: 1m, fn: mean, column: "_value")`;
    console.log(query);
    return  this._influxService.runInfluxQuery(query);
  }
}
