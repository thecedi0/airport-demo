import { Component, OnDestroy, OnInit } from '@angular/core';
import { Aircraft, Communication, ICommunication } from 'src/app/models';
import { AppCentralService, NotifyService, WebApiService } from 'src/app/services';

@Component({
  selector: 'app-aircraft-log',
  templateUrl: './aircraft-log.component.html',
  styleUrls: ['./aircraft-log.component.scss']
})
export class AircraftLogComponent implements OnInit, OnDestroy {

  aircraft = new Aircraft();
  data: ICommunication[] = [];

  isLoading = false;

  constructor(
    private _appCentral: AppCentralService,
    private _webApi: WebApiService,
    private _notify: NotifyService
  ) { }

  ngOnInit() {
    if (!this._appCentral.activeAircraft || this._appCentral.activeAircraft.id === 0) {
      this._appCentral.closeDataDetail.emit(true)
      return;
    }

    this.aircraft = this._appCentral.activeAircraft;
    this.getData();

    this._appCentral.activeAircraft$.subscribe(res => {

      if (res) {
        this.aircraft = res;
        this.getData();
      }

    });


  }


  getData() {
    this.isLoading = true;
    this._webApi.setParams({}, this.aircraft.id.toString())
      .getAll(Communication).subscribe(res => {
        this.data = res;
        this.isLoading = false;
      })

  }



  ngOnDestroy(): void {
    this._appCentral.activeAircraft = undefined;
  }


}
