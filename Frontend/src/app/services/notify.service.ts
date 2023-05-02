import { Injectable, EventEmitter } from '@angular/core';
class Alert {
  type: number = 0; // 0 ->alert, 1 ->avatar, 2->thumbnail
  status: number = 2; // 0 ->error, 1 ->success, 2->info
  img?: string | null = null;
  route?: string | null = null;
  message: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  // private alert: Alert;
  _notify = new EventEmitter<Alert>();
  constructor() { }

  success(message: string) {
    const alert = new Alert();
    alert.type = 0;
    alert.status = 1;
    alert.route = null;
    alert.img = null;
    alert.message = message;

    this._notify.emit(alert);
  }
  error(message: string) {
    const alert = new Alert();
    alert.type = 0;
    alert.status = 0;
    alert.route = null;
    alert.img = null;
    alert.message = message;

    this._notify.emit(alert);
  }
  info(message: string) {
    const alert = new Alert();
    alert.type = 0;
    alert.status = 2;
    alert.route = null;
    alert.img = null;
    alert.message = message;

    this._notify.emit(alert);
  }

  notify(message: string) {
    const alert = new Alert();
    alert.type = 0;
    alert.status = 3;
    alert.route = null;
    alert.img = null;
    alert.message = message;

    this._notify.emit(alert);
  }

  person(message: string, img: string, route = null) {
    const alert = new Alert();
    alert.type = 1;
    alert.status = 3;
    alert.route = route;
    alert.img = img;
    alert.message = message;

    this._notify.emit(alert);
  }

  item(message: string, img: string, route = null) {
    const alert = new Alert();
    alert.type = 2;
    alert.status = 3;
    alert.route = route;
    alert.img = img;
    alert.message = message;

    this._notify.emit(alert);
  }
}
