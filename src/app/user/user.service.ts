import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Building} from "../building";
import {User} from "../user";


@Injectable()
export class UserService {

  private djangoUrl = 'app/heroes';

  constructor(
    private http: Http
  ) { }

  getBuildings (): Observable<Building[]> {
    return this.http.get(this.djangoUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUser (user : string): Observable<User> {
    // ADD USER TO URL HERE
    return this.http.get(this.djangoUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
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
