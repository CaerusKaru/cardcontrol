import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {UserService} from "../shared/user.service";
import {User} from "../../shared/user";
import {RequestService} from "../../request/request.service";
import {NgForm} from "@angular/forms";

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

    let dialogRef = this.dialog.open(UserIdRequestDialog, {
    });
    dialogRef.componentInstance.user = Object.assign({}, this.user);
  }

  public report() {

  }

  private getUser () {
    this.utln = this.userService.getUtln();
    this.userService.userCard.subscribe(
      data => this.user = data
    );
  }

}

@Component({
  selector: 'app-user-id-request-dialog',
  templateUrl: 'user-id-dialog.component.html'
})
export class UserIdRequestDialog {

  constructor (
    private requestService : RequestService,
    private dialogRef : MdDialogRef<UserIdRequestDialog>
  ) {
  }

  public user : User;
  public schools : string[] = ["Liberal Arts", "Engineering", "Other"];
  public types : string[] = ["Undergraduate", "Graduate", "Professor", "Employee", "Other"];

  public closeDialog (f : NgForm) {
    // TODO validate f
    this.requestService.makeUpdateCard(this.user);
    this.dialogRef.close();
  }
}
