import { Component, OnInit } from '@angular/core';
import { WebApiService } from '../services';
import { Weather } from '../models';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  showModal = false;
  currentWeather = new Weather;
  isLoading = false;
  constructor(
    private _webApi: WebApiService
  ) { }

  ngOnInit() {
    // this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.isLoading = true;
    this._webApi
      .setParams({}, '1')
      .get(Weather)
      .subscribe(res => {
        this.currentWeather = res;
        this.isLoading = false;

      });
  }

}
