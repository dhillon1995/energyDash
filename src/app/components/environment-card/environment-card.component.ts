import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApixuService } from '../../shared/services/apixu.service';
@Component({
  selector: 'app-environment-card',
  templateUrl: './environment-card.component.html',
  styleUrls: ['./environment-card.component.css']
})
export class EnvironmentCardComponent implements OnInit {

  constructor(private apixuService: ApixuService) { }

  ngOnInit(): void {
    this.apixuService
      .getWeather("London")
      .subscribe(data => console.log(data));
  }
}
