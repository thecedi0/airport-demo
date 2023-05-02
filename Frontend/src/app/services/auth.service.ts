import { Injectable, EventEmitter } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { map, timestamp } from 'rxjs/operators';
import { AuthToken, IAuthToken } from '../models';
import { WebApiService } from './web-api.service';
// import { userInfo } from 'os';


@Injectable()
export class AuthService {

  redirectToOnLoggin: string = 'home';
  currentUser: IAuthToken = new AuthToken;
  idToken: string = '';
  currentUserLive = new EventEmitter();
  loggedIn: boolean = false;
  loggedOut = new EventEmitter<boolean>();
  authHeaders: HttpHeaders = new HttpHeaders;
  pendingAuth: IAuthToken = new AuthToken;


  constructor(
    private _http: HttpClient,
    private _storage: StorageMap,
    private _webApi: WebApiService
  ) { }

  SignOut() {
    this._storage.get('users.users').subscribe(res => {

      if (res) {
        const airUsers = <Array<any>>res;
        for (let index = 0; index < airUsers.length; index++) {
          if (airUsers[index].id === this.currentUser.unique) {
            // const removeIndex = airUsers.indexOf(index, 0);
            // if (removeIndex > -1) {
            // console.log('Index OOOOOOOOOOOOO', index);

            airUsers.splice(index, 1);
            // }
            this._storage.set('users.users', airUsers).subscribe(() => { });
          }
        }
      }

      // console.log('users.users --->>>', airUsers);
      this.switchAccount();
    });
  }

  switchAccount() {
    // send data to alert loggout
    // console.log('send device logout request');
    if (this.currentUser.deviceId !== null) {
      this.logoutFromDevice(this.currentUser.deviceId, 1)
        .subscribe(res => {

          // console.log(res);
        });

    }

    this.currentUser = null;
    this.authHeaders = null;
    this.loggedIn = false;
    this._clearLocalToken();

  }

  endSignoutMainWindow() { }

  AuthGet(url: string, options?: any): Observable<HttpResponse<any>> {
    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }

    return <any>this._http.get(url, options);
  }

  AuthPut(
    url: string,
    data: any,
    options?: any
  ): Observable<HttpResponse<any>> {
    const body = JSON.stringify(data);
    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }

    return <any>this._http.put(url, body, options);
  }

  AuthDelete(url: string, options?: any): Observable<HttpResponse<any>> {
    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }

    return <any>this._http.delete(url, options);
  }

  AuthPost(
    url: string,
    data: any,
    options?: any
  ): Observable<HttpResponse<any>> {
    const body = JSON.stringify(data);

    if (options) {
      options = this._setRequestOptions(options);
    } else {
      options = this._setRequestOptions();
    }

    return <any>this._http.post(url, body, options);
  }

  updateCurrentUserInfo(data: IUser) {
    // cureent user =[
    //   unique' => $user['id'],
    //         'username' => $user['username'],
    //         'email' => $user['email'],
    //         'name' => $user['name'],
    //         'image' => $user['image'],
    //         'idToken' => (new Token)
    //             ->genToken($user['id']),
    //         'tokenType' => 'Bearer',
    //         'expiresAt' => 3600,
    // ]

    this.currentUser.name =
      (data.surname + ' ' + data.othername).trim() || this.currentUser.name;
    this.currentUser.image = data.image || this.currentUser.image;
    this.currentUser.username = data.username || this.currentUser.username;
    // also update this._storage
    this._storeLocalToken(this.currentUser);
    // update airUsers
    this.addToUsers(this.currentUser);
    this.currentUserLive.emit(this.currentUser);
  }
  RequestOptions(params?: HttpParams, body: any = '') {

    if (!this.loggedIn) {
      this.initLocalToken().subscribe(res => {
        return this.returnRequestedOptions(params, body);
      })
    } else {
      return this.returnRequestedOptions(params, body);
    }



  }

  private returnRequestedOptions(params?: HttpParams, body: any = '') {
    if (this.currentUser) {
      this._setAuthHeaders();
      // console.log('authHeader to send is', this.authHeaders);
      return {
        params: params,
        // headers: this.authHeaders,
        withCredentials: true,
        body: body
      };
    } else {
      // console.log('current user is false');
      return { body: '' };
    }
  }


  requestSignOut(signOutModel: any): Observable<any> {
    // const rootUrl = Codes.SettingsAuthority;
    let rootUrl = this._webApi.enableProd ? this._webApi.rootUrl : '';
    rootUrl += '/identity-api/';
    // reutrn this.http.post('http//bearer/account/signin', signOutModel)
    return <any>(
      this._http
        .put(
          rootUrl + 'account/signin/' + signOutModel.id,
          signOutModel
        )
        .pipe(
          map(res => {
            return res;
          })
        )
    );
  }
  /**
   * Request PasswordMethod bn
   */

  RequestPasswordToken(loginModel: any, isSignUp = false): Observable<any> {


    // const rootUrl = Codes.SettingsAuthority;
    let rootUrl = this._webApi.enableProd ? this._webApi.rootUrl : '';
    rootUrl += '/identity-api/';
    // reutrn this.http.post('http//bearer/account/signin', loginModel)
    return <any>(
      this._http
        .post(
          rootUrl + 'account/signin/',
          loginModel
        )
        .pipe(
          map(res => {
            // console.log('result from login', res);
            const value = <IAuthToken>res;
            if (value.idToken) {

              const cu: IAuthToken = new AuthToken;
              // cu = <IAuthToken>res;
              cu.unique = value.unique;
              cu.email = value.email;
              cu.name = value.name;
              cu.username = value.username;
              cu.image = value.image;
              // device
              cu.deviceId = value.deviceId
              cu.requestConfirmation = value.requestConfirmation;
              // cu.tokenType = null;
              // cu.idToken = null;
              // cu.expiresAt = null;
              this.currentUser = cu;
              this.idToken = value.tokenType + ' ' + value.idToken;

              // console.log('currentUser is ', this.currentUser);
              // console.log('idToken is ', this.idToken);

              if (isSignUp || !value.requestConfirmation) {
                this.authDevice(value);
              }
              this.pendingAuth = value;

            }
            return res;
          })
        )
    );

    // .do(data => console.log('All Uodated!'), (e) => { })
    // .catch(console.log('catch with status handler'));
  }



  public authDevice(value) {


    this._setAuthHeaders();
    this._storeLocalToken(value);

    this.addToUsers(value);

    this.loggedIn = true;
    this.loggedOut.emit(!this.loggedIn);
  }

  // record to users

  addToUsers(user: any) {
    const newUser = {
      id: user.unique || this.currentUser.unique,
      email: user.email || this.currentUser.email,
      image: user.image || this.currentUser.image,
      username: user.username || this.currentUser.username,
      name: user.name || this.currentUser.name
    };

    this._storage.get('users.users').subscribe(res => {

      if (res) {
        const airUsers = <any[]>res;
        let userExists = false;
        for (let i = 0; i < airUsers.length; i++) {
          if (airUsers[i].id === newUser.id) {
            userExists = true;
            // update the userInfo
            // console.log('defaULT', airUsers);
            airUsers[i] = newUser;
            // console.log('AFTER', airUsers);
            this._storage.set('users.users', airUsers).subscribe(() => { });
            break;
          }
        }

        if (!userExists) {
          airUsers.push(newUser);
          this._storage.set('users.users', airUsers).subscribe(() => { });
        }

      } else {
        const newAirUsers = [];
        newAirUsers.push(newUser);
        this._storage.set('users.users', newAirUsers).subscribe(() => { });
      }
    });
    // check it its already added to the playlist or just add and give option to resolve it later
  }

  private _setAuthHeaders() {
    this.authHeaders = new HttpHeaders();
    this.authHeaders = this.authHeaders.append(
      'Authorization',
      this.idToken
    );
    this.authHeaders = this.authHeaders.append(
      'Content-Type',
      'application/json'
    );
    // console.log('set authHeader', this.authHeaders);
  }

  public initLocalToken(): Observable<boolean> {
    // console.log('trying to get storage');
    return Observable.create((observer: Observer<boolean>) => {

      this._storage
        .get('users.viewerInfo')
        .subscribe((activeUser) => {
          // console.log('this is what i got', activeUser);
          if (activeUser) {

            this._setAuthHeaders();
            this.currentUser = <IAuthToken>activeUser;
            // set Token
            this._storage.get('idToken').subscribe(token => {
              if (token) {

                this.idToken = 'Bearer ' + <string>token
              } else {
                this.loggedIn = false;
                return;
              }
            });
            this.loggedIn = true;
            // console.log('is loggedIn');
            this.currentUserLive.emit(this.currentUser);


            // console.log('check person device state');
            // check current status of person device access
            this.checkPersonDeviceState(this.currentUser.deviceId);

          } else {
            this.loggedIn = false;
            // console.log('user not logged in');
          }
          this.loggedOut.emit(!this.loggedIn);
          observer.next(this.loggedIn);
          observer.complete();
        },
          err => observer.error(err)
        );

    })
    // this is an emergency solution
    // find a better way to do that
  }


  checkPersonDeviceState(deviceId: number) {

    this._http.get('/identity-api/persondevice/' + deviceId)
      .subscribe(res => {
        // console.log(res);
        if (res['activated'] && res['status']['id'] === 2) {
          return;
        }

        this.SignOut();

      });

  }


  // store the token to a this._storage after the user is authenticated
  private _storeLocalToken(authResult: IAuthToken) {

    this._storage.set('users.viewerInfo', authResult).subscribe(() => {


      const token = authResult.idToken.length === 0 ?
        this.idToken.replace('Bearer ', '') :
        authResult.idToken;


      this._storage.set('idToken', token).subscribe(() => {

        this._storage.set('registrationTimestamp', Math.floor((+new Date) / 1000)).subscribe(() => {

          this._storage.set('expireTimestamp', authResult.expiresAt.valueOf()).subscribe(() => { });
        });

      });

    });



  }

  // remove the user token from this._storage
  private _clearLocalToken() {

    // console.log('clearing local token');

    this._storage.delete('idToken').subscribe(() => {
      this._storage.delete('users.viewerInfo').subscribe(() => {
        // console.log('storage cleared');


        this.loggedOut.emit(true);
      });
    });

  }

  public logoutFromDevice(deviceId: number, statusId: number): Observable<any> {

    const personDevice = {
      status: { id: statusId }
    };

    // console.log('persondevice data to send', personDevice);

    return <any>this._http
      .put('/identity-api/persondevice/' + deviceId, personDevice)
      .pipe(
        map(res => {
          if (res['success']) {
            console.log('device logged out');
          } else {
            console.log('something went wrong!');
          }
          return res;

        })
      );
  }


  private _setRequestOptions(options?: any) {
    if (options) {
      options.headers.append(
        this.authHeaders.keys[0],
        this.authHeaders.get(this.authHeaders.keys[0])
      );
    } else {
      options = { headers: this.authHeaders };
    }

    return options;
  }

  // for dex app
  authWithRoleGrants(value: IAuthToken) {
    if (value.idToken) {

      this.currentUser = value;
      this.idToken = value.tokenType + ' ' + value.idToken;

      // console.log('currentUser is ', this.currentUser);
      // console.log('idToken is ', this.idToken);

      this._setAuthHeaders();

      // save grants to storage
      this._storeLocalToken(value);


      this.addToUsers(value);
      this.loggedIn = true;

      this.loggedOut.emit(!this.loggedIn);
    }

  }




}
