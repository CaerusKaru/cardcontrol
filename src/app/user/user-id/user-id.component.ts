import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {UserService} from "../shared/user.service";
import {User} from "../../shared/user";
import {RequestService} from "../../request/request.service";

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss']
})
export class UserIdComponent implements OnInit {

  constructor(
    public dialog : MdDialog,
    private requestService : RequestService,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.getUser();
    this.requestService.getResources().subscribe(
      data => {
        console.log(data);
        this.requestService.getAccessPoints(data[0]).subscribe(
          data => {
            console.log(data);
          }
        )
      }
    )
  }

  public user : User;
  public utln : string;

  public requestChange() {
    this.requestService.makeUpdateCard(this.user);
    this.dialog.open(UserIdRequestDialog);
  }

  public report() {

  }

  private errorMessage : string;

  private getUser () {
    this.utln = this.userService.getUtln();
    this.userService.userCard.subscribe(
      data => this.user = data
    );
  }

}

@Component({
  selector: 'app-user-id-request-dialog',
  template: '<h1>Request dialog</h1>'
})
export class UserIdRequestDialog {
}
