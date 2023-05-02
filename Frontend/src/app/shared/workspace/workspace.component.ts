import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'suite-ui-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  @Input() app: string = '';
  @Input() logo: string = '';
  @Input() menu: { name: string; icon: string; route: string; }[] = [];
  closed: boolean = true;
  // title = 'artist';
  theme: string = 'light';

  constructor() {

  }

  ngOnInit() { }

  onToggleClose() {
    this.closed = !this.closed;
  }
}
