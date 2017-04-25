import { Component, OnInit } from '@angular/core';
import {AccessPoint} from "../../shared/access-point";
import {UserService} from "../../user/shared/user.service";
import {ManagedResource} from "../../shared/managed-resource";
import {RequestService} from "../../request/request.service";
import {ChangeRequest} from "../../shared/change-request";
import {Observable} from "rxjs";
import {UserAccount} from "../../shared/user_account";
import {User} from "../../shared/user";

@Component({
  selector: 'app-manager-requests',
  templateUrl: './manager-requests.component.html',
  styleUrls: ['./manager-requests.component.scss']
})
export class ManagerRequestsComponent implements OnInit {

  constructor(
    private userService : UserService,
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.userService.userAccount.subscribe(data => {
      this.userAccount = data;
      if (data.manager_level < 2) {
        this.manageAps = data.access_points_managed;
        let apIdReqs = this.manageAps.map(d => { return this.requestService.getRequestsForAp(d.id) });
        this.userService.userResources.filter(data => data !== null).subscribe(data => {
          this.resources = data;
          this.getResourceRequests(apIdReqs);
        });
      } else {
        this.requestService.getResources().subscribe(data => {
          this.resources = data;
          this.manageAps = data.reduce((a, d) => a.concat(d.children), []);
          let apIdReqs = this.manageAps.map(d => { return this.requestService.getRequestsForAp(d.id) });
          this.getResourceRequests(apIdReqs);
        });
        this.requestService.getCardRequests().subscribe(data => {
          this.cardRequests = data;

          let cardIds : Observable<User>[] = data.map(d => { return this.userService.getCard(d.cur_card) });

          Observable.forkJoin(cardIds).subscribe(data => {
            this.userMap = data;
          });
        });
      }
    });
  }

  public feedback : string;
  public oldCard : User;
  public newCard : User;
  public userMap : User[];
  public cardRequests : ChangeRequest[];
  public resourceRequest : ChangeRequest;
  public cardRequest : ChangeRequest;
  public userAccount : UserAccount;
  public segRequests : ChangeRequest[][] = [];
  public numRequests : number[] = [];
  public selectedCard : boolean;
  public selectedRequests : ChangeRequest[];
  public selectedResource : ManagedResource;
  public resources : ManagedResource[] = [];
  public aps: Observable<AccessPoint[]>;

  public openResource (resource : ManagedResource, index : number) {
    this.selectedResource = resource;
    this.selectedRequests = this.segRequests[index];
    this.cardRequest = null;
    this.selectedCard = false;
  }

  public processRequest (request : ChangeRequest, index : number) {
    this.currentIndex = index;
    this.resourceRequest = request;
    this.aps = Observable.forkJoin(this.resourceRequest.new_access_points.map(a => {
      return this.requestService.getAccessPoint(a)
    }));
  }

  public canApprove (ap: AccessPoint) : boolean {
    return this.userAccount.access_points_managed.filter(a => a.id === ap.id).length > 0;
  }

  public processCard (index : number) {
    let request = this.cardRequests[index];
    this.currentIndex = index;
    this.oldCard = this.userMap[index];
    this.cardRequest = request;
    this.newCard = null;
    this.requestService.getEditedCard(this.cardRequest.new_card).subscribe(
      data => {
        this.newCard = data;
      }
    )
  }

  public openCard () {
    this.selectedResource = null;
    this.resourceRequest = null;
    this.selectedCard = true;
  }

  public approve () {
    if (this.cardRequest) {
      this.cardRequest.status = 1;
      this.cardRequest.feedback = this.feedback;
      this.newCard.resource_uri = this.oldCard.resource_uri;
      this.requestService.updateRequest(this.cardRequest);
      this.requestService.updateCard(this.newCard);
      this.userMap.splice(this.currentIndex, 1);
      this.cardRequests.splice(this.currentIndex, 1);
      this.cardRequest = null;
      this.selectedCard = false;
    }

    if (this.resourceRequest) {
      this.resourceRequest.status = 1;
      this.resourceRequest.feedback = this.feedback;
      this.requestService.updateRequest(this.resourceRequest);
      this.selectedRequests.splice(this.currentIndex, 1);
      this.requestService.getUserAccountById(this.resourceRequest.user).subscribe(
        data => {
          Observable.forkJoin(this.resourceRequest.new_access_points.map(d => {return this.requestService.getAccessPoint(d)}))
            .subscribe(c => {
              data.access_points.push(...c);
              this.requestService.updateUserAccount(data);
              this.selectedResource = null;
              this.resourceRequest = null;
            });
        }
      );
    }
  }

  public reject () {
    if (this.cardRequest) {
      this.cardRequest.status = 3;
      this.cardRequest.feedback = this.feedback;
      this.requestService.updateRequest(this.cardRequest);
      this.userMap.splice(this.currentIndex, 1);
      this.cardRequests.splice(this.currentIndex, 1);
      this.cardRequest = null;
      this.selectedCard = false;
    }

    if (this.resourceRequest) {
      this.resourceRequest.status = 3;
      this.resourceRequest.feedback = this.feedback;
      this.requestService.updateRequest(this.resourceRequest);
      this.selectedRequests.splice(this.currentIndex, 1);
      this.selectedResource = null;
      this.resourceRequest = null;
    }
  }

  private currentIndex : number;
  private manageAps : AccessPoint[];

  private getResourceRequests (apIdReqs : Observable<ChangeRequest>[]) {
    Observable.forkJoin(apIdReqs).subscribe(data => {
      let requests : ChangeRequest[] = [].concat(...data).filter(d => d.status === 0);
      let aps: string[] = [].concat(...requests.map(a => a.new_access_points));
      this.resources.forEach(d => {
        let dUris = d.children.map(c => c.resource_uri);
        this.segRequests.push(aps.reduce((a, c, i) => {
          return dUris.indexOf(c) > -1 ? a.concat(requests[i]) : a
        }, []));
        this.numRequests.push(aps.reduce((a, c) => {
          return dUris.indexOf(c) > -1 ? a + 1 : a
        }, 0));
      });
    });
  }

}
