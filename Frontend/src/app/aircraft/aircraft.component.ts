import { Component, OnInit } from '@angular/core';
import { AppCentralService, NotifyService, WebApiService } from '../services';
import { Router } from '@angular/router';
import { Aircraft, AircraftStatus, IAircraft } from '../models';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit {


  actionButtons: { route: string, title: string, icon: string }[] = [];
  title: string = 'Aircrafts'
  baseUrl: string = '/dashboard/';
  showDetail: boolean = false;
  defaultDetailTitle: string = 'Aircrafts Detail';
  detailTitle: string = 'Aircrafts Detail';
  isLoading: boolean = false;

  data: IAircraft[] = [];
  selectedAircraft: Aircraft = new Aircraft();

  page: number = 1;
  pageSize: number = 20;
  totalData: number = 20;

  dataMaxLength: number = 20;

  searchValue: string = '';
  businessId: number = 0;
  orderBy: string = 'id';
  theme: string = '';

  showModal = false;

  constructor(
    private _appCentral: AppCentralService,
    private _webApi: WebApiService,
    private _router: Router,
    private _notify: NotifyService
  ) { }

  ngOnInit() {

    this.actionButtons = [
      { route: 'log', title: 'Communication Logs', icon: 'axl ax-note' }
    ]

    this.onReloadData();

    this._appCentral.closeDataDetail.subscribe(res => {
      this.onCloseRoute();
    });

    // listen to changes to data
    this._appCentral.dataChanged.subscribe(res => {
      this.onReloadData();
    });
  }

  onReloadData() {
    this.isLoading = true;
    this.pageSize = this.dataMaxLength;
    this.page = 1;
    this.getData();

  }
  onPaginateData(page: number) {
    this.isLoading = true;
    this.page = page;
    this.getData();

  }

  getData(): any {
    // get the id of the person
    this._webApi
      .setParams({
        page: this.page,
        pageSize: this.pageSize,
        searchValue: this.searchValue,
        orderBy: [this.orderBy]

      })
      .getAll(Aircraft)
      .subscribe(res => {

        // console.log('responds', res)
        // this.isLoading = false;

        this.data = <Aircraft[]>res ?? [];
        // this.page = res.page;
        // this.pageSize = res.pageSize;
        this.totalData = this.data.length;

        this.isLoading = false;
      });

  }


  onSearchData(query: string) {
    query = query.trim();
    if (this.searchValue !== query && query !== '') {
      this.searchValue = query;
      this.onReloadData();
    }
  }

  onPaginate($event: number) {
    this.isLoading = true;
    this.page = $event;
    this.pageSize = this.dataMaxLength;
    this.getData();

  }

  getStatusIcon(status: AircraftStatus): string {
    let icon = 'axl ax-plane';
    switch (status) {
      case 2:
        icon = 'axl ax-inflight';
        break;
      case 3:
        icon = 'axl ax-arrival';
        break;

      default:

        break;
    }

    return icon;
  }


  onDetailRoute(link: string, title: string = 'View Detail', aircraft?: Aircraft) {
    this.showDetail = true;
    this.detailTitle = title;
    this._appCentral.activeAircraft = aircraft;
    this._appCentral.activeAircraft$.emit(aircraft);
    // console.log(link);
    window.scrollTo({ top: 0, left: 0 });
    const route = (link.startsWith('/') ? '' : this.baseUrl) + link;
    console.log('routing to ', route);

    this._router.navigateByUrl(route);

  }


  onDelete(item: IAircraft) {
    this._webApi.dataMap({ from: item, to: this.selectedAircraft });
    // this.selectedInvoice = item;
    this.showModal = true;
    this._notify.info('You are about to delete a Bank Item!');
  }


  deleteItem() {

    this.isLoading = true;
    this._webApi
      .setParams({}, this.selectedAircraft.id.toString())
      .delete(Aircraft)
      .subscribe(res => {
        // console.log('responds',res)
        this.isLoading = false;
        console.log(res);
        this._appCentral.dataChanged.emit();

        if ((<any>res).success) {
          // console.log('tell me it was successfull', res);
          this._notify.success((<any>res)['message']);
          // this.data.id = res['id'];


          this.onReloadData();
          this.showModal = false;

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

        this.isLoading = false;

      });
  }

  onCloseRoute() {
    this.detailTitle = this.defaultDetailTitle;
    this.showDetail = false;
    this._router.navigateByUrl(this.baseUrl + 'default');

  }

}
