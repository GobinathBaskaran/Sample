import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClientService {

  constructor(private http: Http) {
  }

  createAuthorizationHeader(headers: Headers) {
    // TODO: add auth token
    // if (this._appHelperService.authToken != undefined && this._appHelperService.authToken != null
    // && this._appHelperService.authToken != '')
    //     headers.append('Authorization', 'Bearer ' + this._appHelperService.authToken);
  }

  get(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    if (data === undefined || data === null || data === '') {
      return this.http.put(url, null, {
        headers: headers
      });
    } else {
      return this.http.put(url, data, {
        headers: headers
      });
    }
  }

  delete(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

  patch(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.patch(url, data, {
      headers: headers
    });
  }

  handleMapping(response: any) {
    try {
      console.log(response.json());
      return response.json();
    } catch (err) {
      if (response.status === 200) {

        // Handling this because of put method recieved data of undefined or null
        return response;
      } else {
        // Handle error
        return Observable.throw(err);
      }
    }
  }

  handleError(error: any) {
    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Node.js server error');
  }

}
