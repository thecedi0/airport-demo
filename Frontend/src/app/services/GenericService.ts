import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { throwError as observableThrowError, Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { IResult } from '../models';

export interface IParam {
  page?: number | string;
  pageSize?: number | string;
  id?: number | string;
  gid?: number | string;
  category?: string | number;
  categoryType?: string | number;
  searchValue?: string;
  searchFields?: string[];
  orderBy?: string[]
}

interface IRequestOption {
  headers?:
  | HttpHeaders
  | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?:
  | HttpParams
  | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

@Injectable()
export class GenericService {
  params: HttpParams = new HttpParams();
  route: string | undefined = '';

  requestOption?: IRequestOption;
  authOption?: IRequestOption;

  enableProd: boolean = false;
  rootUrl: string = '';
  baseServiceUrl: string = '';
  constructor(
    private _http: HttpClient,
  ) {
  }

  private creatUrl<T>(constructor: any) {
    const metadata = (new constructor).__controller();

    let url = this.enableProd ? this.rootUrl : ''; // production

    if(metadata.name.length === 0){
      url +=
      this.baseServiceUrl +
      (this.route ? this.route : '');
    }else{
      url +=
      this.baseServiceUrl +
      metadata.name +
      '/' +
      (this.route ? this.route : '');
    }
    

    // reset HttpParams & route to null
    this.route = undefined;
    this.params = new HttpParams();

    return url.toLowerCase();
  }

  // private _setAuthHeaders(): IRequestOption {
  //   if (this._authService.authHeaders) {
  //     this.authOption = {
  //       headers: this._authService.authHeaders
  //     }
  //   } else {
  //     this.authOption = null;
  //   }

  //   return this.authOption;
  //   // console.log('set authHeader', this.authHeaders);
  // }

  ConvertToHttpParam(paramsObject: IParam) {
    let httpParams = new HttpParams();
    if (paramsObject) {
      const fields = Object.getOwnPropertyNames(paramsObject);

      fields.forEach((field: string) => {
        const value = (paramsObject as any)[field];
        if (value) {
          httpParams = httpParams.set(field.toString(), `${value}`);
        }
      });
    }
    return httpParams;
  }

  dataMap(data: { from: object; to: object }) {
    if (data.from && data.to) {
      const toFields = Object.getOwnPropertyNames(data.to);
      const fromFields = Object.getOwnPropertyNames(data.from);
      toFields.forEach((i: any) => {
        if (fromFields.map(f => f.toLowerCase()).includes(i.toLowerCase())) {
          (data.to as any)[i] = (data.from as any)[i];
        }
      });
      // return data.to;
    }

  }

  setRequestOptions(options: IRequestOption, headers?: any): IRequestOption {
    // add authorization if available
    // if (this._authService.authHeaders) {
    //   options.headers = new HttpHeaders();
    //   options.headers.append(
    //     this._authService.authHeaders.keys[0],
    //     this._authService.authHeaders.get(this._authService.authHeaders.keys[0])
    //   );
    // } else {
    //   options.headers = null;
    // }

    options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })

    return options;
  }

  setParams(paramsObject: IParam, routes?: string): GenericService {
    this.params = this.ConvertToHttpParam(paramsObject);
    // console.log('Params OOOOOOOOOOOOOOOOO', this.params);

    this.requestOption = this.setRequestOptions({ params: this.params, });

    this.route = routes;
    return this;
  }

  get<T>(constructor: new () => T): Observable<T> {

    const url = this.creatUrl<T>(constructor);

    return this._http.get<T>(url, this.requestOption).pipe(
      map(res => {
        return res;
      })
      // catchError(this.errorHandler)
    );
  }

  getAs<t, T>(constructor: new () => T): Observable<t> {
    return (this.get(constructor) as any) as Observable<t>;
  }

  getAsPageOf<t, T>(constructor: new () => T): Observable<IResult<t>> {
    return (this.get(constructor) as any) as Observable<IResult<t>>;
  }
  getPageOf<T>(constructor: new () => T): Observable<IResult<T>> {
    return (this.get(constructor) as any) as Observable<IResult<T>>;
  }

  getAll<T>(constructor: new () => T): Observable<T[]> {
    return (this.get(constructor) as any) as Observable<T[]>;
  }

  post<T>(data: T): Observable<T> {
    const constructor = (data as Object).constructor;

    const url = this.creatUrl(constructor);
    console.log(this.requestOption);
    return this._http.post<T>(url, JSON.stringify(data), this.requestOption);
  }

  postAs<t, T>(constructor: new () => T, data: t): Observable<any> {
    const url = this.creatUrl(constructor);
    return this._http.post<T>(url, JSON.stringify(data), this.requestOption);
  }

  put<T>(data: T): Observable<T> {
    const constructor = (data as Object).constructor;
    const url = this.creatUrl(constructor);
    return this._http.put<T>(url, JSON.stringify(data), this.requestOption);
  }

  putAs<t, T>(constructor: new () => T, data: t): Observable<T> {
    const url = this.creatUrl(constructor);
    return this._http.put<T>(url, JSON.stringify(data), this.requestOption);
  }

  patch<T>(data: T): Observable<T> {
    const constructor = (data as Object).constructor;
    const url = this.creatUrl(constructor);
    return this._http.patch<T>(url, JSON.stringify(data), this.requestOption);
  }

  delete<T>(constructor: new () => T): Observable<T> {
    const url = this.creatUrl(constructor);
    return this._http.delete<T>(url, this.requestOption);
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}
