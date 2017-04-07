import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {User} from "../../shared/user";
import {UserAccount} from "../../shared/user_account";
import {Constants} from "../../shared/constants";
import {BehaviorSubject} from "rxjs";
import {ManagedResource} from "app/shared/managed-resource";
import {AccessPoint} from "app/shared/access-point";
import {environment} from "environments/environment";

@Injectable()
export class UserService {
  public userAccount : Observable<UserAccount>;
  public userCard : Observable<User>;
  public userResources : Observable<ManagedResource[]>;
  public userAccessPoints : Observable<AccessPoint[]>;

  constructor(
    private http: Http
  ) {
    this.userCard = this._userCard.asObservable();
    this.userAccount = this._userAccount.asObservable();
    this.userResources = this._userResources.asObservable();
    this.userAccessPoints = this._userAccessPoints.asObservable();
    this.initData();
  }

  public getUtln() : string {
    return 'masnes01';
  }

  private getUserAccount (): Observable<UserAccount[]> {
    return this.http.get(Constants.API_PORT + '/api/v1/user_account/?utln=' + this.getUtln())
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getCard (url : string): Observable<User> {
    return this.http.get(Constants.API_PORT + url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private _userCard : BehaviorSubject<User> = new BehaviorSubject(null);
  private _userAccount : BehaviorSubject<UserAccount> = new BehaviorSubject(null);
  private _userResources : BehaviorSubject<ManagedResource[]> = new BehaviorSubject(null);
  private _userAccessPoints : BehaviorSubject<AccessPoint[]> = new BehaviorSubject(null);

  private initData () {
    this.getUserAccount().subscribe(
      data => {
        this._userAccount.next(data[0]);
        this.getCard(data[0].card).subscribe(
          data => {
            this._userCard.next(data);
          },
          error => {
          });
        this.populateResources();
      },
      error => {
      }
    );
  }

  private populateResources () {
    this.userAccount.filter(data => data !== null).first().subscribe(
      data => {
        let accessPoints : AccessPoint[] = data.access_points;
        this._userAccessPoints.next(accessPoints);
        let resources : Observable<ManagedResource>[] = accessPoints.map(data => {
          return this.getResourceForUri(data.parent);
        });
        Observable.forkJoin(resources).subscribe(
          data => {
            let noDupe = Array.from(data.reduce((m, t) => m.set(t.id, t), new Map()).values());
            this._userResources.next(noDupe);
          }
        );
    });
  }

  private getResourceForUri (uri : string) : Observable<ManagedResource> {
    return this.http.get(environment.API_PORT + uri)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.objects || body || { };
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
