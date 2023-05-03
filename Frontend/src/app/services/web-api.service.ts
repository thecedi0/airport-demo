import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebApiService extends GenericService {
  constructor(http: HttpClient) {
    super(http);
    // this.rootUrl = 'https://api.co';
    this.baseServiceUrl = '/api/';
  }

}
