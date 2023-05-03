import { Injectable, EventEmitter } from '@angular/core';
import { Aircraft, IAircraft } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AppCentralService {

  closeDataDetail = new EventEmitter<boolean>();
  dataChanged = new EventEmitter<boolean>();


  activeAircraft?: IAircraft = new Aircraft;
  activeAircraft$ = new EventEmitter<IAircraft | undefined>();




}
