import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { InfluxDB } from '@influxdata/influxdb-client';

@Injectable({
  providedIn: 'root'
})

export class InfluxService {
  url = environment.InfluxDB_Url || '';
  token = environment.InfluxDB_Token || '';
  org = environment.InfluxDB_Org || '';
  bucket = environment.InfluxDB_Bucket || '';
  queryApi = new InfluxDB({ url:this.url, token:this.token }).getQueryApi(this.org);

  constructor() { }

  runInfluxQuery(query:string) {
    return this.queryApi.collectRows(`from(bucket:"${this.bucket}") ${query}`)
  }
}
