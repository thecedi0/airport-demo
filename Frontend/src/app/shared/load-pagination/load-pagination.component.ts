import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'galaxy-load-pagination',
  templateUrl: './load-pagination.component.html',
  styleUrls: ['./load-pagination.component.scss']
})
export class LoadPaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 0;

  @Input() pagingType: 'button' | 'combo' = 'button';

  lastPage: number = 0;

  visible: number = 5;

  data: any = [];



  @Output() pageClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    let newPage = [];
    // const count =  Math.round(this.total / this.limit);
    // console.log('please tell me my parameters', this.total, this.limit);
    // console.log(
    //   Math.round(this.total / this.limit),
    //   Math.floor(this.total / this.limit),
    //   Math.ceil(this.total / this.limit),
    //   this.total / this.limit
    // );
    this.lastPage = Math.ceil(this.total / this.limit);

    let init = 0;
    if (this.page < this.visible - 1) {
      init = 0;
    } else if (this.page >= this.visible - 1 && this.lastPage > this.visible) {
      init = 4;
    }

    if (this.total > this.limit) {
      for (let i = init; i < this.lastPage; i++) {
        newPage = [i + 1];
        this.data.push(newPage);
        if (this.data.length >= this.visible) {
          break;
        }
      }
    }
  }

  onPageClicked(page: number) {
    this.pageClicked.emit(page);
  }
}
