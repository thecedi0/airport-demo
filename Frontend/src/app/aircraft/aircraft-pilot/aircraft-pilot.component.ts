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

    this.onSendLocation();

  }


  onSwitchPilotMode() {
    this.aircraft.autoPilot = !this.aircraft.autoPilot;

    if(this.aircraft.autoPilot && this.aircraft.status.toString() === 'PARKED'){
      this._notify.info('Auto Pilot turned Off. Please do a manual takeoff');
      return;
    }

    
    this._notify.success('Aircraft is on ' + (this.aircraft.autoPilot ? 'AutoPilot' : 'Manual Pilot'));
  
    this.autoPilot();
    
  }


  autoPilot() {
    if (!this.aircraft.autoPilot) {
      return;
    }

    // console.log(this.aircraft.status.toString() + AircraftStatus.AIRBORNE.toString()); //
    switch (this.aircraft.status.toString()) {
      case 'AIRBORNE':
        this.onSendRequest("LAND");
        
        break;

        case 'LANDED':
        // this.onSendRequest("LAND");
        this.aircraft.autoPilot = false;
        
        break;

        case 'PARKED':
          // this.onSendRequest("LAND");
          this.aircraft.autoPilot = false;
          this._notify.info('Auto Pilot turned Off. Please do a manual takeoff')
          
          break;
    
        default:
        this.onSendRequest("TAKEOFF")
        break;
    }
    setTimeout(() => {
      this.autoPilot();
    }, 10000);
  }

  onSendLocation() {
    if (this.aircraft.status.toString() !== 'AIRBORNE') {

      setTimeout(() => {
        this.onSendLocation();
      }, 10000);

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
      .put(req).subscribe(res => {
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
      this.aircraft.status.toString() === 'AIRBORNE' &&
      intent === 'TAKEOFF'
    ) {
      this._notify.error('Aircraft is already AIRBORNE');
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
        this.aircraft.status = res.aircraft.status;
        this._notify.info('Aircraft '+this.aircraft.name+' request to '+res.intent+' was '+(res.response?'Approved':'Denied'));
        console.log(res);
      });
    }
    
    onPackCraft(){
      // alert('Pack Craft')
      this._webApi.setParams({}, 'park/'+this.aircraft.id.toString())
      .put(new Aircraft)
      .subscribe(res=>{
      this.aircraft.status = res.status;
      if(res.status.toString() === 'PARKED')
        this._notify.success('Aircraft '+this.aircraft.name+' successfully parked');
    });
  }

}
