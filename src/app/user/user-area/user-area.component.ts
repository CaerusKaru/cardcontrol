import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ManagedResource} from "app/shared/managed-resource";
import {UserService} from "../shared/user.service";
import {AccessPoint} from "../../shared/access-point";
import {User} from "../../shared/user";
import {RequestService} from "../../request/request.service";

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit {

  constructor(
    public dialog: MdDialog,
    private userService : UserService
  ) { }

  resources : ManagedResource[];

  ngOnInit() {
    this.userService.userResources.filter(data => data !== null).subscribe(
      data => {
        this.resources = data;
      }
    )
  }

  chooseBuilding (resource : ManagedResource) {
    let dialogRef = this.dialog.open(UserAreaDialog, {
      height: '70%',
      width: '60%'
    });
    dialogRef.componentInstance.resource = resource;
  }
}

@Component({
  selector: 'app-user-area-dialog',
  templateUrl: 'user-area-dialog.component.html',
  styleUrls: ['user-area-dialog.component.scss']
})
export class UserAreaDialog implements OnInit {

  constructor (
    public dialog : MdDialog,
    private requestService : RequestService,
    private userService : UserService,
    private dialogRef : MdDialogRef<UserAreaDialog>
  ) {
  }
  resource : ManagedResource;
  myAccessPoints : AccessPoint[];
  notMyAccessPoints : AccessPoint[];

  ngOnInit () {
    this.userService.userAccessPoints.subscribe(
      data => {
        let accessIds : number[] = data.map(i => i.id);
        this.myAccessPoints = this.resource.children.filter(i => { return accessIds.indexOf(i.id) !== -1 });
        this.notMyAccessPoints = this.resource.children.filter(i => { return accessIds.indexOf(i.id) === -1 });
      }
    );
  }

  public openComment (ap : AccessPoint) {
    let dialogRef = this.dialog.open(UserAreaCommentDialog);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.requestService.makeAccessRequest([ap], data);
        }
      }
    );
  }
}

@Component({
  selector: 'app-user-area-comment-dialog',
  template: `
    <div fxLayout="column" style="padding: 16px">
      <md-input-container>
        <input mdInput type="text" placeholder="Reason Why" [(ngModel)]="reasonWhy" floatPlaceholder="never">
      </md-input-container>
      <div fxLayout="row">
        <button md-button md-dialog-close>CANCEL</button>
        <button md-button (click)="submit()" color="primary">SUBMIT</button>
      </div>
    </div>
  `
})
export class UserAreaCommentDialog {

  constructor (
    private dialogRef : MdDialogRef<UserAreaCommentDialog>
  ) {
  }
  reasonWhy : string;

  public submit () {
    this.dialogRef.close(this.reasonWhy);
  }
}
