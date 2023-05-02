import { Component, OnInit, SecurityContext, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'galaxy-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  @Input() isTop: boolean = false;
  @Input() reverseConstrast: boolean = false;
  data: {
    type: number; // 0 ->alert, 1 ->avatar, 2->thumbnail
    status: number; // 0 ->error, 1 ->success, 2->info
    img?: string;
    route?: string;
    message: string;
  }[] = [];

  alert!: {
    type: number; // 0 ->alert, 1 ->avatar, 2->thumbnail
    status: number; // 0 ->error, 1 ->success, 2->info
    img?: string;
    route?: string;
    message: string;
  };
  constructor(
    private _notifyService: NotifyService,
    private _router: Router,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // register here
    this._notifyService._notify.subscribe(res => {
      this.data.push(res as any);
      setTimeout(() => {
        this.onCloseAlert(res, null);
      }, 10000);
    });


  }
  addAlert() {
    const alt = this.alert;

    this.data.push(alt);

    setTimeout(() => {
      this.onCloseAlert(alt, null);
    }, 10000);
  }

  onGetDataIcon(status: number) {
    let icon = 'circle';
    switch (status) {
      case 0:
        icon = 'urgent';
        break;
      case 1:
        icon = 'checks';
        break;
      case 2:
        icon = 'bell-ringing';
        break;

      default:
        icon = 'brand-aiira';
        break;
    }

    return icon;
  }


  onGetDataColor(status: number) {
    let color = 'special';
    switch (status) {
      case 0:
        color = 'pink';
        break;
      case 1:
        color = 'tgreen';
        break;
      case 2:
        color = 'special';
        break;

      default:
        color = 'special';
        break;
    }

    return color;
  }

  onAlertRoute(route?: string) {
    if (route) {
      // console.log('rout to --->', route);
      this._router.navigateByUrl('/' + route);
    }

    // console.log('no routing found');
  }
  onCloseAlert(alert: any, e: Event | null) {
    if (e) e.stopPropagation();
    // this.data = this.data.slice(index, 1);
    this.data = this.data.filter(obj => obj !== alert);
  }

  private embedImage(path: string, size = 'default') {
    // return this._embed.imgUrl(path, size);
  }


}
