import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  private authStorage: boolean = false;
  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.loggedIn) {
      // console.log('logged in, default used');
      return true;
    }

    // Check local token
    // console.log('logged in, local checked');
    this._authService.initLocalToken().subscribe(res => {
      this.authStorage = res;
      // console.log('done checking storage - ', res);
    },
      err => console.log(err)
    );

    this._authService.redirectToOnLoggin = route.url.toString();
    // console.log('snapshop taken --- > ', this._authService.redirectToOnLoggin);

    return this.authStorage ? true : this.redirectToLogin(state);
  }


  private redirectToLogin(state: RouterStateSnapshot): boolean {

    // console.log('trying to redirect - authStorage - ', this.authStorage);

    if (this.authStorage) {
      return this.authStorage;
    }


    if (this._router.url.indexOf('/unauthorized') === -1) {
      this._router.navigateByUrl('/unauthorized'
      );
      // {
      //   queryParams: { returnUrl: state.url }
      // }


    } else {
      this._router.navigateByUrl('/unauthorized');
    }

    return false;
  }
}
