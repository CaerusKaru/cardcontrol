import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {Constants} from "../shared/constants";
import {User} from "../shared/user";
import {ChangeRequest} from "../shared/change-request";
import {UserAccount} from "../shared/user_account";
import {UserService} from "../user/shared/user.service";

@Injectable()
export class RequestService {

  private apiUrl = Constants.API_ENDPOINT;

  private userAccount : UserAccount;

  constructor(
    private http : Http,
    private userService : UserService
  ) {
    this.userService.userAccount.subscribe(
      data => {
        console.log(data);
        this.userAccount = data
      }
    )
  }

  makeUpdateCard (newCard : User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.makeNewCard(newCard).subscribe(
      data => {
        let newReq : ChangeRequest = {
          new_access_points: [],
          request_level: 1,
          status: 0,
          new_card: data.resource_uri,
          user: this.userAccount.resource_uri,
          message : '',
          created_by: this.userAccount.resource_uri,
          modified_by: this.userAccount.resource_uri
        };
        this.http.post(Constants.API_PORT + '/api/v1/request/', newReq, options)
          .map(this.extractData)
          .catch(this.handleError)
          .subscribe();
      }
    );
  }

  private makeNewCard(newCard : User) : Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Constants.API_PORT + '/api/v1/card/', newCard, options)
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
