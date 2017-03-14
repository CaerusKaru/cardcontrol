import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {UserService} from "../user.service";
import {User} from "../../user";

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

  user = new User();
  errorMessage : string;

  ngOnInit() {
    this.getUser();
  }

  getUser () {
    this.userService.getUser(this.utln)
                    .subscribe(
                      users => this.user = users[0],
                      error =>  this.errorMessage = <any>error);
  }

  utln = this.userService.getUtln();

  requestChange() {
    this.dialog.open(UserIdRequestDialog);
  }

  report() {
    alert("Report lost/stolen");
  }

}

@Component({
  selector: 'app-user-id-request-dialog',
  template: '<h1>Request dialog</h1>'
})
export class UserIdRequestDialog {
}
