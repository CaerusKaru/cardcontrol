import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {UserService} from "../user.service";
import {User} from "../../user";
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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

  user = new Subject<User>();
  errorMessage : string;

  ngOnInit() {
    this.userService.getUser(this.utln).subscribe(
      users => this.user = users[0],
      error =>  this.errorMessage = <any>error);
  }

  firstname = 'Benjamin';
  lastname = 'Hescott';
  studentID = '1112223';
  utln = 'hescott';
  jumbocashID = '998877665';
  DOB = '5/6/19xx';
  YOG = '17';
  school = 'LA';

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
