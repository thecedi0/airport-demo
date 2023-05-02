import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  @Input() title: string = 'List Of Persons';
  @Input() detail: string = '';
  @Input() paginatorPage: number = 0;
  @Input() paginatorTotal: number = 0;
  @Input() paginatorLimit: number = 0;

  @Input() headerTitle: string = '';
  @Input() headerDetail: string = '';
  @Input() showDataCard: boolean = true;
  @Input() showSearchAtAll: boolean = true;
  @Input() showDetail: boolean = false;
  @Input() showConstantBtns: boolean = true;
  @Output() closeDetail = new EventEmitter();
  @Output() searchClicked = new EventEmitter<string>();
  @Output() pageinateData = new EventEmitter<number>();
  searchValue: string = '';
  showSearch: boolean = true;
  miniMode: boolean = false;
  constructor() { }

  ngOnInit() {
    this.onResize(window.innerWidth)
  }

  onShowDetail() {
    this.showDetail = !this.showDetail;
    if (!this.showDetail) {
      this.closeDetail.emit(true);
    }
  }

  print(y: any) {
    console.log(y)
  }



  onResize(innerWidth: number) {
    if (innerWidth < 767) {
      this.miniMode = true;
      this.showSearch = false;
      // this.showConstantBtns = false;
    } else {
      this.miniMode = false;
      this.showConstantBtns = true;
      this.showSearch = true;
    }
  }
  onShowDataCard(event: string) {
    this.showDataCard = !this.showDataCard;
  }

  onToggleSearch() {
    this.showSearch = !this.showSearch;

    if (this.miniMode) {
      if (this.showSearch) {
        this.showConstantBtns = false;
      } else {
        this.showConstantBtns = true;
      }
    } else {
      this.showConstantBtns = true;
    }
  }

  onSearchTriggered() {
    // console.log('search from daa-grid', this.searchValue);
    this.searchClicked.emit(this.searchValue);
  }

  onPaginateData($event: number) {
    this.pageinateData.emit($event);
  }
}
