import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InfluxService } from '../../shared/services/influx.service';
import { FormGroup, FormControl } from '@angular/forms';

interface Period {
  value: string;
  viewValue: string;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

@Component({
  selector: 'app-powertab',
  templateUrl: './powertab.component.html',
  styleUrls: ['./powertab.component.css']
})
export class PowertabComponent implements OnInit {

  url: string = "https://www.knowatts.co.uk/Power+Manager+Dashboard";
  urlSafe: SafeResourceUrl
  powerData: any = [
    { useDevice: true,  field: 'D6F00034F12A8_CT1', label: 'Kitchen 2' },
    { useDevice: true,  field: 'D6F00034F12A8_CT2', label: 'Kitchen 1' },
    { useDevice: true,  field: 'D6F00034F12A8_CT4', label: 'MDB Port 2' },
    { useDevice: true,  field: 'D6F00034F12A8_CT7', label: 'MB1 Port 5' },
    { useDevice: true,  field: 'D6F00034F12A8_CT8', label: 'MB1 Port 6' },
    { useDevice: true,  field: 'D6F00034F12A8_CT9', label: 'MB2 Port 1' },
    { useDevice: true,  field: 'D6F00034F12A8_CT10', label: 'MB2 Port 2' },
    { useDevice: true,  field: 'D6F00034F12A8_CT11', label: 'MB2 Port 3' },
    { useDevice: true,  field: 'D6F00034F12A8_CT12', label: 'ELECTRAK 1' },
    { useDevice: true,  field: 'D6F00034F12A8_CT13', label: 'ELECTRAK 2' },
    { useDevice: true,  field: 'D6F00034F12A8_CT14', label: 'ELECTRAK 3' },
    { useDevice: true,  field: 'D6F00034F12A8_CT15', label: 'ELECTRAK 4' },
    { useDevice: true,  field: 'D6F00034F12A8_CT16', label: 'ELECTRAK 5' },
    { useDevice: true,  field: 'D6F00034F12A8_CT17', label: 'A/C Roof Comms Room' },
    { useDevice: true,  field: 'D6F00034F12A8_CT19', label: 'Main Incomer Brown' },
    { useDevice: true,  field: 'D6F00034F12A8_CT20', label: 'Main Incomer Black' },
    { useDevice: true,  field: 'D6F00034F12A8_CT21', label: 'Main Incomer Grey' },
    { useDevice: true,  field: 'D6F00034F12A8_CT22', label: 'LCM 412 & 411' },
    { useDevice: true,  field: 'D6F00034F12A8_CT23', label: 'LCM 40E & 40D' },
    { useDevice: true,  field: 'D6F00034F12A8_CT24', label: 'LCM 400 & 40F' },
    { useDevice: true,  field: 'D6F00034F12A8_CT25', label: 'LCM 40B & 403' },
    { useDevice: true,  field: 'D6F00034F12A8_CT26', label: 'LCM 404 & 40C' },
    { useDevice: true,  field: 'D6F00034F12A8_CT27', label: 'LCM 405, 406 & 407' },
    { useDevice: true,  field: 'D6F00034F12A8_CT28', label: 'LCM 40A & 402' },
    { useDevice: true,  field: 'D6F00034F12A8_CT29', label: 'LCM 400 & 408' },
    { useDevice: true,  field: 'D6F00034F12A8_F1', label: 'Frequency 1' },
    { useDevice: true,  field: 'D6F00034F12A8_F2', label: 'Frequency 2' },
    { useDevice: true,  field: 'D6F00034F12A8_F3', label: 'Frequency 3' },
    { useDevice: true,  field: 'D6F00034F12A8_V1', label: 'Voltage 1' },
    { useDevice: true,  field: 'D6F00034F12A8_V2', label: 'Voltage 2' },
    { useDevice: true,  field: 'D6F00034F12A8_V3', label: 'Voltage 3' }
  ];

  option: any = {
    title: {
      left: 'center',
      text: ''
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
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  periods: Period[] = [
    {value: 'last', viewValue: 'View Last...'},
    {value: '6hours', viewValue: '6 hours'},
    {value: 'day', viewValue: 'Day'},
    {value: '2days', viewValue: '2 Days'},
    {value: 'week', viewValue: 'Week'},
    {value: 'month', viewValue: 'Month'},
    {value: 'year', viewValue: 'Year'},
  ];

  allDeviceUse: boolean = false;
  timePeriod: string = 'last';

  constructor(private _influxService: InfluxService) { }

  ngOnInit(): void {
    this.getCTData();
  }

  someDeviceUse(): boolean {
    return this.powerData.filter(t => t.useDevice).length > 0 && !this.allDeviceUse;
  }

  useAllDevices() {
    this.allDeviceUse = this.powerData.every(t => t.useDevice);
  }

  addNewDate() {
    this.timePeriod = 'custom';
  }
  
  setAll(use: boolean) {
    this.allDeviceUse = use;
    this.powerData.forEach(t => t.useDevice = use);
  }

  showResult() {
    this.loading = false;
    this.option.series = [];
    this.option.legend.data = [];
    this.getCTData();
  }

  selectTimePeriod(value) {
    this.timePeriod = value;
  }

  download() {
    console.log('download');
  }

  async getCTData() {
    let range: string = this.getRange(this.timePeriod);
    let field = '';

    let useDevice: any[] = this.powerData.filter((item:any) => item.useDevice == true);
    console.log(useDevice);

    for (let i = 0; i < useDevice.length; i++) {
      if (i == useDevice.length - 1) {
        field += `r._field == "${useDevice[i].field}"`;
      } else {
        field += `r._field == "${useDevice[i].field}" or `;
      }
    }

    if (field != '') {
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
      this.option.legend.data = legendData;
    }
  }

  getTitleTimeRange(start: string, end:string) {
    let startMonth = monthNames[ new Date(start).getMonth()];
    let startDate =  start.slice(8,10);
    let starttext =  start.slice(11,16);
    starttext = `${starttext} ${startDate} ${startMonth}`;

    let endMonth = monthNames[new Date(end).getMonth()];
    let endDate = end.slice(8,10);
    let endtext = end.slice(11,16);
    endtext = `${endtext} ${endDate} ${endMonth}`;

    return [starttext, endtext];
  }

  getRange(time: string) {
    let range: string = '';
    let today = new Date();
    let start: string = '';
    let end: string = '';

    switch(time) {
      case 'last':
        start = today.toISOString().slice(0, 10) + 'T00:00:00Z';
        end = today.toISOString();
       
        break;
      case '6hours':
        end = today.toISOString();
        today.setHours( today.getHours() - 6);
        start = today.toISOString();
        break;
      case 'day':
        start = today.toISOString().slice(0, 10) + 'T00:00:00Z';
        end = today.toISOString().slice(0, 10) + 'T23:59:59Z';
        break;
      case '2days':
        end = today.toISOString().slice(0, 10) + 'T23:59:59Z';
        today.setDate(today.getDate() - 1);
        start = today.toISOString().slice(0, 10) + 'T00:00:00Z';
        break;
      case 'week':
        let firstDayofWeek = this.getMonday(today);
        start = firstDayofWeek.toISOString().slice(0, 10) + 'T00:00:00Z';
        end = today.toISOString().slice(0, 10) + 'T23:59:59Z';
        break;
      case 'month':
        let firstDayofMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
        start = firstDayofMonth + 'T00:00:00Z';
        end = today.toISOString().slice(0, 10) + 'T23:59:59Z';
        break;
      case 'year':
        start = new Date(today.getFullYear(), 0, 1).toISOString();
        end = today.toISOString();
        break;
      case 'custom':
        let _date = new Date(this.range.value.start);
        _date.setDate(_date.getDate() + 1);
        start = _date.toISOString().slice(0, 10) + 'T00:00:00Z';

        _date = new Date(this.range.value.end);
        _date.setDate(_date.getDate() + 1);
        end = _date.toISOString().slice(0, 10) + 'T23:59:59Z';
        break;
    }

    let timeString: Array<string> = this.getTitleTimeRange(start, end);
    this.option.title.text = `Brook Green - ${timeString[0]} to ${timeString[1]}`;
    return `range(start: ${start}, stop: ${end})`;
  }

  runQuery(range: string, field: string) {
    const query = `|> ${range}
                   |> filter(fn:(r) => ${field})
                   |> aggregateWindow(every: 1m, period: 1m, fn: mean, column: "_value")`;
    console.log(query);
    return  this._influxService.runInfluxQuery(query);
  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
  }
}
