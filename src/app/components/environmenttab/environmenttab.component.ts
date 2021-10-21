import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { InfluxService } from '../../shared/services/influx.service';

const data = {
  chart: {
    caption: "Todays Average temperature",
    yaxisname: "Temperature in °C",
    subcaption: "2021",
    legendposition: "Right",
    drawanchors: "0",
    showvalues: "0",
    plottooltext: "<b>$dataValue</b> iPhones sold in $label",
    theme: "fusion"
  },
  data: [
    {
      label: "Jan",
      value: "17"
    },
    {
      label: "Feb",
      value: "19"
    },
    {
      label: "March",
      value: "22"
    },
    {
      label: "April",
      value: "23"
    },
    {
      label: "May",
      value: "19"
    },
    {
      label: "June",
      value: "21"
    },
    {
      label: "July",
      value: "24"
    },
    {
      label: "August",
      value: "26"
    },
    {
      label: "September",
      value: "19"
    },
    {
      label: "October",
      value: "17"
    },
    {
      label: "November",
      value: "16"
    },
    {
      label: "December",
      value: "15"
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

  /** Execute a query and receive line table metadata and rows. */
  constructor(private http: HttpClient, private _influxService: InfluxService) { }

  ngOnInit(): void {
    this.getInfluxDBResult();
  }

  getDataHttp(url:string) {
    let header = new HttpHeaders({ "Access-Control-Allow-Origin":"*"});
    const requestOptions = {  headers: header}; 
    return this.http.get(url, requestOptions);
  }

  getInfluxDBResult() {
    const tempQuery = `|> range(start: -10m)\
                  |> filter(fn:(r) => r._field == "uplink_message_decoded_payload_averageTemperature_value" )`;
    const luxQuery = `|> range(start: -10m)\
                  |> filter(fn:(r) => r._field == "uplink_message_decoded_payload_battery" )`;

    this._influxService.runInfluxQuery(tempQuery).then(
      (res: any) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
