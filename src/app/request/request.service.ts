import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import {User} from "../shared/user";
import {ChangeRequest} from "../shared/change-request";
import {UserAccount} from "../shared/user_account";
import {UserService} from "../user/shared/user.service";
import {ManagedResource} from "../shared/managed-resource";
import {AccessPoint} from "../shared/access-point";
import {environment} from "../../environments/environment";
import {MdSnackBar} from "@angular/material";
import {Domain} from "../shared/domain";

@Injectable()
export class RequestService {

  private userAccount : UserAccount;

  constructor(
    private http : Http,
    private userService : UserService,
    public snackBar: MdSnackBar
  ) {
    this.userService.userAccount.subscribe(
      data => {
        this.userAccount = data
      }
    )
  }

  public getRequests (id : number) : Observable<ChangeRequest[]> {
    return this.http.get(environment.API_PORT + '/api/v1/request?user=' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getRequestsForAp (apId : number) : Observable<ChangeRequest> {
    return this.http.get(environment.API_PORT + '/api/v1/request/?new_access_points__id=' + apId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteRequest (request : ChangeRequest) {
    this.http.delete(environment.API_PORT + request.resource_uri).subscribe();
  }

  public closeReuqest (request : ChangeRequest) {
    // change status to 2 and message to 'closed by user'
    this.http.put(environment.API_PORT + request.resource_uri, {}).subscribe();
  }

  public updateRequest (request : ChangeRequest) {
    this.http.put(environment.API_PORT + request.resource_uri, request).subscribe(data => {
      this.snackBar.open('Request updated', '', {
        duration: 1750
      });
    },
    error => {
      this.snackBar.open('Unable to update request', '', {
        duration: 1750
      })
    });
  }

  public updateAccessPoint (ap : AccessPoint) {
    this.http.put(environment.API_PORT + ap.resource_uri, ap).subscribe(data => {
        this.snackBar.open('Request updated', '', {
          duration: 1750
        });
      },
      error => {
        this.snackBar.open('Unable to update request', '', {
          duration: 1750
        })
      });
  }

  public getUserAccount (utln : string) : Observable<UserAccount[]> {
    return this.http.get(environment.API_PORT + '/api/v1/user_account/?utln='+utln)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUserAccountById (resourceUri : string) : Observable<UserAccount> {
    return this.http.get(environment.API_PORT + resourceUri)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUsersPartial (partialUtln : string) : Observable<User[]> {
    return this.http.get(environment.API_PORT + '/api/v1/card/?utln__startswith='+partialUtln)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getResources () : Observable<ManagedResource[]> {
    return this.http.get(environment.API_PORT + '/api/v1/resource')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCardRequests () : Observable<ChangeRequest[]> {
    // TODO add or operator to status so it can be 0 or 2
    return this.http.get(environment.API_PORT + '/api/v1/request/?new_access_points__isnull=true&status=0')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAccessPoints (resource : ManagedResource) : Observable<AccessPoint[]> {
    return this.http.get(environment.API_PORT + '/api/v1/access_point?resource=' + resource.id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getEditedCard (uri : string) : Observable<User> {
    return this.http.get(environment.API_PORT + uri)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAccessPoint (accessPointUri : string) : Observable<AccessPoint> {
    return this.http.get(environment.API_PORT + accessPointUri)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getRootDomain () : Observable<Domain> {
    return this.http.get(environment.API_PORT + '/api/v1/domain/1')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public makeAccessRequest (accessPoints : AccessPoint[], reasonWhy : string) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let resourceUris : string[] = accessPoints.map(a => a.resource_uri);

    let newReq : ChangeRequest = {
      new_access_points: resourceUris,
      granted_access_points: [],
      request_level: 1,
      status: 0,
      id: null,
      resource_uri: null,
      new_card: null,
      cur_card: this.userAccount.card,
      user: this.userAccount.resource_uri,
      reason : reasonWhy,
      feedback : null,
      created_by: this.userAccount.resource_uri,
      modified_by: this.userAccount.resource_uri,
      modified_at: null,
      utln: this.userAccount.utln
    };

    this.http.post(environment.API_PORT + '/api/v1/request/', newReq, options)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(
        data => {
          this.snackBar.open('Request submitted', '', {
            duration: 1750
          });
        },
        error => {
          this.snackBar.open('Error submitting request', '', {
            duration: 1750
          });
        }
      );
  }

  public makeUpdateCard (newCard : User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.makeNewCard(newCard).subscribe(
      data => {
        let newReq : ChangeRequest = {
          new_access_points: [],
          granted_access_points: [],
          request_level: 1,
          status: 0,
          id: null,
          resource_uri: null,
          cur_card: this.userAccount.card,
          new_card: data.resource_uri,
          user: this.userAccount.resource_uri,
          reason : null,
          feedback : null,
          created_by: this.userAccount.resource_uri,
          modified_by: this.userAccount.resource_uri,
          modified_at: null,
          utln: this.userAccount.utln
        };
        this.http.post(environment.API_PORT + '/api/v1/request/', newReq, options)
          .map(this.extractData)
          .catch(this.handleError)
          .subscribe(data => {
            this.snackBar.open('Request submitted!', '', {
              duration: 1750
            });
          });
      },
      error => {
        this.snackBar.open('Unable to submit request', '', {
          duration: 1750
        });
        // TODO add form validation return
      }
    );
  }

  public updateCard (newCard : User) {
    this.http.put(environment.API_PORT + newCard.resource_uri, newCard).subscribe(
      data => {
        this.snackBar.open('Request updated', '', {
          duration: 1750
        })
      },
      error => {
        this.snackBar.open('Unable to update request', '', {
          duration: 1750
        });
      });
  }

  public addAccessPoints (userAccount : UserAccount, accessPoints : AccessPoint[]) {
    userAccount.access_points.push(...accessPoints);
    this.http.put(environment.API_PORT + userAccount.resource_uri, userAccount).subscribe(
      data => {
        this.snackBar.open('Added access points', '', {
          duration: 1750
        })
      },
      error => {
        this.snackBar.open('Unable to add access points', '', {
          duration: 1750
        })
      }
    );
  }

  public updateUserAccount (newUserAccount : UserAccount) {
    this.http.put(environment.API_PORT + newUserAccount.resource_uri, newUserAccount).subscribe(
      data => {
        this.snackBar.open('User account updated', '', {
          duration: 1750
        })
      },
      error => {
        this.snackBar.open('Unable to update user account: ' + newUserAccount.utln, '', {
          duration: 1750
        });
      });
  }

  public makeUser (user : User) : Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.API_PORT + '/api/v1/card/', user, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public makeAccessPoint (ap : AccessPoint) : Observable<AccessPoint> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.API_PORT + '/api/v1/access_point/', ap, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public makeUserAccount (userAccount : UserAccount) : Observable<UserAccount> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.API_PORT + '/api/v1/user_account/', userAccount, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private makeNewCard(newCard : User) : Observable<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(environment.API_PORT + '/api/v1/edited_card/', newCard, options)
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
