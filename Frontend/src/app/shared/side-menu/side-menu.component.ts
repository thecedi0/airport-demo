import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() appName: string = '';

  @Input() menu: { name: string; icon: string; route: string; }[] = [];
  @Input() isMini: boolean = false;

  @Input() theme: string = '';
  showMenu: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onToggleMenu() {
    this.showMenu = !this.showMenu;
  }
  onMenuClicked(e) {
    e.stopPropagation();
    this.onToggleMenu();
  }
}
