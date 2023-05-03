import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWeather, Weather } from 'src/app/models';
import { WebApiService } from 'src/app/services';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-weather-new',
  templateUrl: './weather-new.component.html',
  styleUrls: ['./weather-new.component.scss']
})
export class WeatherNewComponent implements OnInit {


  data: IWeather = new Weather();
  isLoading = false;

  @Input() showModal = false;
  @Output() closeModal = new EventEmitter();


  constructor(
    private _notify: NotifyService,
    private _aRoute: ActivatedRoute,
    private _webApi: WebApiService
  ) { }

  ngOnInit() {

    this.isLoading = true;
    this.newDataInit();

  }


  newDataInit() {
    this.data = new Weather();
    this.isLoading = false;
  }

  onSubmit(status: number) {

    this.isLoading = true;
    this.createEntity();

  }


  createEntity() {
    this._webApi
      .setParams({})
      .post(this.data)
      .subscribe(res => {
        // console.log('responds',res)
        this.isLoading = false;
        console.log(res);

        if (res.id > 0) {
          // console.log('tell me it was successfull', res);
          this._notify.success('Weather updated!');
          // this.data.id = res['id'];

          // update businessList

          // route back to list
          // this._router.navigateByUrl('/blogs/u/articles');
          // switch to is editable.
          // this.data.id = res.id;
          // this.isEdit = true;
          this.onCloseDetail();
        } else {
          // console.log('Somthing went wrong. Please try again.', res);
          this._notify.error('Somthing went wrong. Please try again.');
        }
        this.isLoading = false;
      });
  }


  onCloseDetail() {
    this.closeModal.emit(true);
  }
}
