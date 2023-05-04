import { Component, Input, OnInit } from '@angular/core';
import { Aircraft, AircraftLocation, AircraftStatus, Communication, IAircraft } from 'src/app/models';
import { NotifyService, WebApiService } from 'src/app/services';

@Component({
  selector: 'app-aircraft-pilot',
  templateUrl: './aircraft-pilot.component.html',
  styleUrls: ['./aircraft-pilot.component.scss']
})
export class AircraftPilotComponent implements OnInit {

  @Input() aircraft: IAircraft = new Aircraft;
  showModal = false;

  location = new AircraftLocation();
  constructor(private _notify: NotifyService, private _webApi: WebApiService) { }

  ngOnInit() {
    this.aircraft.autoPilot = false;

    this.location.type = this.aircraft.type.toString();

  }


  onSwitchPilotMode() {
    this.aircraft.autoPilot = !this.aircraft.autoPilot;
    this._notify.success('Aircraft is on ' + (this.aircraft.autoPilot ? 'AutoPilot' : 'Manual Pilot'));

    this.autoPilot();
  }


  autoPilot() {
    if (!this.aircraft.autoPilot) {
      return;
    }


    setTimeout(() => {
      this.autoPilot();
    }, 1000);
  }

  onSendLocation() {
    if (this.aircraft.status.toString() === 'PARKED') {
      return;
    }

    const req = new AircraftLocation();
    req.type = this.aircraft.type.toString();
    req.latitude = this.location.latitude;
    req.longitude = this.location.longitude;
    req.altitude = this.location.altitude;
    req.heading = this.location.altitude;

    this._webApi
      .setParams({}, this.aircraft.callSign?.toString() + '/location')
      .post(req).subscribe(res => {
        console.log(res);

        setTimeout(() => {
          this.location.latitude *= Math.random();
          this.location.longitude *= Math.random();
          this.location.altitude *= Math.random();
          this.location.heading *= Math.random();

          this.onSendLocation();
        }, 10000);

      });
  }


  onSendRequest(intent: string) {
    if (
      this.aircraft.status.toString() === 'AIRBORN' &&
      intent === 'TAKEOFF'
    ) {
      this._notify.error('Aircraft is already AIRBORN');
      return;
    }

    if (
      intent === 'LAND' &&
      this.aircraft.status.toString() === 'PARKED'
    ) {
      this._notify.error('Aircraft is already PARKED');
      return;
    }


    if (intent === 'LAND') {
      this.aircraft.status = AircraftStatus.APROACH;
    }


    this._webApi
      .setParams({}, this.aircraft.callSign?.toString() + '/intent')
      .postAs(AircraftLocation, { state: intent }).subscribe(res => {
        console.log(res);
      });
  }
}
