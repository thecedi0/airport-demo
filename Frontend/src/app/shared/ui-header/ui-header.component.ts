import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SafeResourceUrl } from '@angular/platform-browser';
import { User } from 'src/app/models';

@Component({
  selector: 'galaxy-uix-header',
  templateUrl: './ui-header.component.html',
  styleUrls: ['./ui-header.component.scss']
})
export class UiHeaderComponent implements OnInit {

  @Input() appName: string = '';
  @Input() logo: string = '';
  @Input() theme: string = '';
  userInfo = new User();
  xsAvatar: SafeResourceUrl = '';
  smAvatar: SafeResourceUrl = '';

  isLoggedIn: boolean = false;
  appLogo: SafeResourceUrl | string = '';

  showMenu: boolean = false;

  activeUser = new User;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {

    // this.activeUser = this._appCentral.activeUser;

    {
      this.appLogo = './assets/images/logo/logo.png';
    }

  }

  setAuthUserInfo() {
    // this.userInfo.name = this._authService.currentUser.name;
    // this.userInfo.username = this._authService.currentUser.username;

    // // if (this._authService.currentUser.curator.length > 0) {
    // //   this.isCurator = true;
    // //   this.userInfo.curator = this._authService.currentUser.curator;
    // // }

    // // embed needed images once!
    // this.xsAvatar = this.embedImage(this._authService.currentUser.image, 'xs');
    // this.smAvatar = this.embedImage(this._authService.currentUser.image, 'sm');

    // // subscribe for changes in userinfo
    // this._authService.currentUserLive.subscribe(res => {
    //   this.userInfo.name = res.name;
    //   this.userInfo.username = res.username;

    //   this.xsAvatar = this.embedImage(res.image, 'xs');
    //   this.smAvatar = this.embedImage(res.image, 'sm');
    // });
  }

  onToggleTheme() {

  }


  onToggleMenu() {
    this.showMenu = !this.showMenu;
  }
  onLogOut() {
    // this._authService.SignOut();
    this._router.navigateByUrl('/unauthorized');
  }


}
