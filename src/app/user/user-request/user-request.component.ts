import { Component, OnInit } from '@angular/core';
import {ChangeRequest} from "../../shared/change-request";
import {RequestService} from "../../request/request.service";
import {UserAccount} from "../../shared/user_account";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  constructor(
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

  public requests : ChangeRequest[];
  public openRequests : ChangeRequest[];
  public closedRequests : ChangeRequest[];

  public editRequest (request : ChangeRequest) {
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
