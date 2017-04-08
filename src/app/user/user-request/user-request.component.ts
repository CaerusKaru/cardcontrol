import { Component, OnInit } from '@angular/core';
import {ChangeRequest} from "../../shared/change-request";
import {RequestService} from "../../request/request.service";
import {UserAccount} from "../../shared/user_account";
import {UserService} from "../shared/user.service";
import {MdDialog} from "@angular/material";
import {UserIdRequestDialog} from "../user-id/user-id.component";
import {AccessPoint} from "../../shared/access-point";
import {Observable} from "rxjs/Observable";
import {Domain} from "../../shared/domain";

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  constructor(
    public dialog : MdDialog,
    private userService : UserService,
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.activeTabIndex = 0;
    this.userService.userAccount.filter(data => data !== null).subscribe(
      data => {
        this.userAccount = data;
        this.getRequests()
      }
    )
  }

  public activeTabIndex : number;

  public domains : Domain[];
  public requests : ChangeRequest[];
  public openRequests : ChangeRequest[];
  public closedRequests : ChangeRequest[];

  public editRequest (request : ChangeRequest, isOpen : boolean) {
    if (request.new_card) {
      this.userService.getCard(request.new_card).subscribe(
        data => {
          let dialogRef = this.dialog.open(UserIdRequestDialog);
          dialogRef.componentInstance.user = data;
          if (isOpen) {
            dialogRef.componentInstance.requestOpen = true;
          } else {
            dialogRef.componentInstance.feedback = 'owehfowejfiowejfiowjefojewfwieofjoweijfoiwe';
            dialogRef.componentInstance.readOnly = true;
          }

          dialogRef.afterClosed().subscribe(data => {
            if (data) {
              if (data.closeRequest) {
                request.status = 3;
                request.feedback = 'Closed by user';
                this.requestService.updateRequest(request);
                // TODO make a more elegant way of structuring this with unshift/slice
                this.openRequests = this.requests.filter(i => i.status === 0 || i.status === 2);
                this.closedRequests = this.requests.filter(i => i.status === 1 || i.status === 3);
                return;
              }
              this.requestService.updateCard(data);
            }
          });
        }
      );
    } else {
      let dialogRef = this.dialog.open(UserRequestDialogComponent);
      console.log(request.new_access_points);
      let accessPointRequests = request.new_access_points.map(this.requestService.getAccessPoint);
      Observable.forkJoin(accessPointRequests).subscribe(data => {
        dialogRef.componentInstance.newAccessPoints = data;
      });
    }
  }

  public getDate (dateString : string) {
    return new Date(dateString).toLocaleDateString();
  }

  private userAccount : UserAccount;

  private getRequests () {
    this.requestService.getRequests(this.userAccount.id)
      .filter(data => data !== null)
      .subscribe(data => {
        this.requests = data;
        this.openRequests = data.filter(i => i.status === 0 || i.status === 2);
        this.closedRequests = data.filter(i => i.status === 1 || i.status === 3);
      });
  }
}

@Component({
  selector: 'app-user-request-dialog',
  templateUrl: './user-request-dialog.component.html'
})
export class UserRequestDialogComponent {

  constructor () {

  }

  newAccessPoints : AccessPoint[];
}
