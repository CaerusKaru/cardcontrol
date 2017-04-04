import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {UserService} from "../user.service";
import {User} from "../../user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss']
})
export class UserIdComponent implements OnInit {

  constructor(
    public dialog : MdDialog,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  public user : User;
  public utln : string;

  public requestChange() {
    this.dialog.open(UserIdRequestDialog);
  }

  public report() {
    alert("Report lost/stolen");
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
