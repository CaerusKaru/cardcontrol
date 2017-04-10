import { Component, OnInit } from '@angular/core';
import {ChangeRequest} from "../../shared/change-request";
import {RequestService} from "../../request/request.service";
import {UserAccount} from "../../shared/user_account";
import {UserService} from "../shared/user.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {UserIdRequestDialog} from "../user-id/user-id.component";
import {AccessPoint} from "../../shared/access-point";
import {Observable} from "rxjs/Observable";
import {Domain} from "../../shared/domain";
import {NgForm} from "@angular/forms";

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
    );
    this.requestService.getRootDomain().subscribe(
      data => {
        if (data.domain_children) {
          this.domains = data.domain_children;
        } else {
          this.domains = [data];
        }
      }
    );
  }

  public activeTabIndex : number;

  public domains : Domain[];
  public requests : ChangeRequest[];
  public openRequests : ChangeRequest[];
  public closedRequests : ChangeRequest[];

  public editRequest (request : ChangeRequest, isOpen : boolean) {
    if (request.new_access_points.length === 0) {
      this.userService.getCard(request.new_card).subscribe(
        data => {
          let dialogRef = this.dialog.open(UserIdRequestDialog);
          dialogRef.componentInstance.user = data;
          if (isOpen) {
            dialogRef.componentInstance.requestOpen = true;
          } else {
            dialogRef.componentInstance.feedback = 'Request closed by user';
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
      let accessPointRequests : Observable<AccessPoint>[] =
        request.new_access_points.map(d => { return this.requestService.getAccessPoint(d) });
      if (isOpen) {
        dialogRef.componentInstance.requestOpen = true;
      } else {
        dialogRef.componentInstance.feedback = 'Request closed by user';
        dialogRef.componentInstance.readOnly = true;
      }
      Observable.forkJoin(accessPointRequests).subscribe(
        data => {
          dialogRef.componentInstance.newAccessPoints = data;
        }
      );

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
          // this.requestService.updateCard(data); // TODO change this to update access_points
        }
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

  constructor (
    public dialogRef : MdDialogRef<UserRequestDialogComponent>
  ) {
  }

  requestOpen : boolean;
  feedback : string;
  readOnly : boolean;
  newAccessPoints : AccessPoint[];

  public closeDialog (f : NgForm) {
    // TODO validate f
    this.dialogRef.close();
  }

  public closeRequest () {
    this.dialogRef.close({closeRequest: true});
  }
}
