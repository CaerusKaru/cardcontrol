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
    public requestService : RequestService,
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
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.requestService.makeUpdateCard(data);
      }
    })
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
    private dialogRef : MdDialogRef<UserIdRequestDialog>
  ) {
  }

  public requestOpen : boolean;
  public feedback : string;
  public readOnly : boolean;
  public user : User;
  public schools : string[] = ["Liberal Arts", "Engineering", "Other"];
  public types : string[] = ["Undergraduate", "Graduate", "Professor", "Employee", "Other"];

  public closeDialog (f : NgForm) {
    // TODO validate f
    this.dialogRef.close(this.user);
  }

  public closeRequest () {
    this.dialogRef.close({closeRequest: true});
  }
}
