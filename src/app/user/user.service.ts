import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Building} from "../building";
import {User} from "../user";


@Injectable()
export class UserService {

  private djangoUrl = 'http://ec2-107-20-90-253.compute-1.amazonaws.com:8000/api/v1/';

  constructor(
    private http: Http
  ) { }

  getUtln() : string {
    return 'masnes01';
  }

  isAdmin() : boolean {
    return true;
  }

  getBuildings (): Observable<Building[]> {
    return this.http.get(this.djangoUrl + 'door/')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUser (utln : string): Observable<User[]> {
    return this.http.get(this.djangoUrl + 'card/?utln=' + utln)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.objects || { };
  }

  private handleError (error: Response | any) {
    // TODO: Add remote logging
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
