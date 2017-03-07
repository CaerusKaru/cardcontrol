import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.scss']
})
export class UserIdComponent implements OnInit {

  constructor(
    public dialog : MdDialog
  ) { }

  ngOnInit() {
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
