import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Aircraft, AircraftType, IAircraft } from 'src/app/models';
import { AppCentralService, NotifyService, WebApiService } from 'src/app/services';

@Component({
  selector: 'app-aircraft-new',
  templateUrl: './aircraft-new.component.html',
  styleUrls: ['./aircraft-new.component.scss']
})
export class AircraftNewComponent implements OnInit {


  data: IAircraft = new Aircraft();
  businessId: number = 0;
  isLoading = false;
  isDataReady = false;
  isEdit = false;

  type = AircraftType;


  constructor(
    private _appCentral: AppCentralService,
    private _notify: NotifyService,
    private _aRoute: ActivatedRoute,
    private _webApi: WebApiService
  ) { }

  ngOnInit() {

    this.isLoading = true;

    // check params to make sure it isnt an edit
    this._aRoute.params.subscribe(res => {
      if (res['id']) {
        // console.log('getting entity');
        this.getData(res['id']);
      } else {
        // console.log('creating entity');
        this.newDataInit();
      }
    });
  }

  getData(id: string) {
    this._webApi
      .setParams({ id })
      .get(Aircraft)
      .subscribe(res => {
        const singRes: Aircraft = (res as any)[0];
        // this._webApi.dataMap({ from: (res as any)[0], to: this.data });

        this.data.id = singRes.id;
        this.data.name = singRes.name;
        this.data.type = singRes.type.toString() === 'AIRLINES' ? 1 : 2;
        console.log('res to data ', res, this.data);

        this.isEdit = true;
        this.isLoading = false;
        this.isDataReady = true;
        // _$(res).MapTo(this.album);
      });
  }
  newDataInit() {
    this.data = new Aircraft();

    this.isLoading = false;
    this.isDataReady = true;

  }

  onSubmit(status: number) {

    // console.log(this.data);
    // check to see if title & description is not empty


    // this.data.branch = [this.BusinessDepartment];

    // console.log(this.data);
    // return;

    this.isLoading = true;

    this.isEdit ? this.updateEntity() : this.createEntity();

  }

  updateEntity() {
    this._webApi
      .put(this.data)
      .subscribe(res => {
        // console.log('responds',res)
        this.isLoading = false;

        if ((<any>res).success) {
          // console.log('tell me it was successfull', res);
          this._notify.success((<any>res)['message']);
          // switch to is editable.
          // this._router.navigateByUrl('/u/');
          this._appCentral.dataChanged.emit();
          this.onCloseDetail();
        } else {
          // console.log('Somthing went wrong. Please try again.', res);
          this._notify.error((<any>res)['message']);
        }
        this.isLoading = false;
      });
  }

  createEntity() {
    this._webApi
      .post(this.data)
      .subscribe(res => {
        // console.log('responds',res)
        this.isLoading = false;
        console.log(res);
        this._appCentral.dataChanged.emit();

        if ((<any>res).success) {
          // console.log('tell me it was successfull', res);
          this._notify.success((<any>res)['message']);
          // this.data.id = res['id'];

          // update businessList

          // route back to list
          // this._router.navigateByUrl('/blogs/u/articles');
          // switch to is editable.
          // this.data.id = res.id;
          // this.isEdit = true;
        } else {
          // console.log('Somthing went wrong. Please try again.', res);
          this._notify.error((<any>res)['message']);
        }
        this.onCloseDetail();
        this.isLoading = false;
      });
  }


  onCloseDetail() {
    this._appCentral.closeDataDetail.emit(true);
  }
}
