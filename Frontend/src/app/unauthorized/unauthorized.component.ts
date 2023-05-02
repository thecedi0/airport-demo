import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, WebApiService } from '../services';
import { AuthToken, IAuthToken } from '../models';

@Component({
  selector: 'galaxy-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  login: IAuthToken = new AuthToken;
  isLoading = false;
  message: string = ''
  constructor(
    private _authService: AuthService,
    private _webApi: WebApiService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (this._authService.loggedIn) {
      this._router.navigateByUrl('/');
    }
  }

  isUsernameValid(): boolean {

    return true;

  }
  isPasswordValid(): boolean {
    if (this.login.password !== null && this.login.password.length > 4) {
      return true;
    }
    this.message = 'Password field cannot be empty';
    return false;
  }
  onSignIn() {
    this.message = '';
    if (!(this.isUsernameValid() && this.isPasswordValid())) {
      return;
    }

    this.isLoading = true;
    this._webApi.post(this.login).subscribe(res => {
      // console.log('auth sentence is', res);
      if (res.unique !== 0 && res.idToken?.length > 0) {
        this.message = 'Welcome ' + res.name;
        const value = res;

        this._authService.authWithRoleGrants(value);
        this.isLoading = false;
        this._router.navigateByUrl('/');



      } else {
        this.message = res['message'];
        this.isLoading = false;
      }

    });
  }




}
