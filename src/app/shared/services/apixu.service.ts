import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    let weatherAPIUrl = "http://api.weatherstack.com/historical";
    let url:string = "http://api.weatherstack.com/current?access_key=a95e9d844b3ed5563ab65eae56709bfc&query=London";
    return this.http.get(url);
  }
}
