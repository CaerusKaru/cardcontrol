import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {RequestService} from "../../request/request.service";
import {ManagedResource} from "../../shared/managed-resource";
import {UserService} from "../../user/shared/user.service";
import {MdDialog, MdDialogRef} from "@angular/material";
import {UserAccount} from "../../shared/user_account";

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.scss']
})
export class ManagerUsersComponent implements OnInit {

  constructor(
    public dialog : MdDialog,
    private userService : UserService,
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.userControl.valueChanges
      .subscribe(name => {
        this.selectedUser = (typeof name === 'object') ? name : null;
        this.flUsers = this.requestService.getUsersPartial(name);
        if (this.selectedUser) {
          this.requestService.getUserAccount(this.selectedUser.utln).subscribe(
            data => {
              let ua = data[0];
              this.userAccount = ua;
              this.siteManager = this.userAccount.manager_level === 2;
              let noDupe = Array.from(ua.access_points.reduce((m, t) => m.set(t.parent, t), new Map()).values());
              let resourceReqs : Observable<ManagedResource>[] = noDupe.map(data => {
                return this.userService.getResourceForUri(data.parent);
              });
              this.resources = Observable.forkJoin(resourceReqs);
            }
          );
        }
      });
  }

  public schools : string[] = ["Liberal Arts", "Engineering", "Other"];
  public types : string[] = ["Undergraduate", "Graduate", "Professor", "Employee", "Other"];

  public userAccount : UserAccount;
  public selectedUser : User;
  public userControl = new FormControl();
  public flUsers : Observable<User[]>;
  public resources : Observable<ManagedResource[]>;
  public siteManager : boolean;

  public userName (user : User) : string {
    return user ? user.utln : '';
  }

  public chooseResource(res : ManagedResource) {
    let dialogRef = this.dialog.open(ManagerUsersDialogComponent, {
      width: '50%'
    });
    dialogRef.componentInstance.resource = res;
    dialogRef.componentInstance.userAccount = this.userAccount;
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.requestService.updateUserAccount(data);
      }
    });
  }

  public editUser () {
    if (!this.selectedUser) {
      return;
    }
    this.requestService.updateCard(this.selectedUser);
    this.userAccount.manager_level = this.siteManager ? 2 : this.userAccount.access_points_managed.length !== 0 ? 1 : 0;
    if (this.userAccount.manager_level === 2) {
      let dialogRef = this.dialog.open(ManagerUsersConfirmComponent);
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          this.requestService.updateUserAccount(this.userAccount);
        }
      });
    } else {
      this.requestService.updateUserAccount(this.userAccount);
    }
  }

}

@Component({
  selector: 'app-manager-users-confirm',
  template: `
    <md-card class="unicorn-dark-theme mat-app-background">
      <md-card-content><span>Are you sure?</span></md-card-content>
      <md-card-actions>
        <button md-raised-button md-dialog-close>NO</button>
        <button md-raised-button (click)="confirm()" color="primary">YES</button>
      </md-card-actions>
    </md-card>
  `
})
export class ManagerUsersConfirmComponent {

  constructor (
    private dialogRef : MdDialogRef<ManagerUsersConfirmComponent>
  ) {
  }

  public confirm () {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'app-manager-users-dialog',
  templateUrl: './manager-users-dialog.component.html'
})
export class ManagerUsersDialogComponent implements OnInit {
  constructor (
    private dialogRef : MdDialogRef<ManagerUsersDialogComponent>
  ) {
  }

  ngOnInit () {
    let access = this.userAccount.access_points.map(ap => ap.id);
    let manage = this.userAccount.access_points_managed.map(ap => ap.id);
    Object.assign(this.apsAccess, this.resource.children);
    Object.assign(this.apsManage, this.resource.children);
    this.apsAccess = this.apsAccess.map((d, i) => access.indexOf(this.resource.children[i].id) > -1);
    this.apsManage = this.apsManage.map((d, i) => manage.indexOf(this.resource.children[i].id) > -1);
  }

  private apsAccess : boolean[] = [];
  private apsManage : boolean[] = [];

  public userAccount : UserAccount;
  public resource : ManagedResource;

  public save () {

    let resAccess = this.apsAccess.reduce((a, d, i) =>  d ? a.concat(this.resource.children[i]) : a, []);
    let resManage = this.apsManage.reduce((a, d, i) =>  d ? a.concat(this.resource.children[i]) : a, []);
    let rawIds = this.resource.children.map(ap => ap.id);
    let idManage = this.userAccount.access_points_managed.reduce((a, d) => rawIds.indexOf(d.id) > -1 ? a : a.concat(d), []);
    idManage.push(...resManage);
    let idAccess = this.userAccount.access_points.reduce((a, d) => rawIds.indexOf(d.id) > -1 ? a : a.concat(d), []);
    idAccess.push(...resAccess);

    this.userAccount.access_points = idAccess;
    this.userAccount.access_points_managed = idManage;

    if (this.userAccount.access_points_managed.length > 0 && this.userAccount.manager_level < 1) {
      this.userAccount.manager_level = 1;
    }

    this.dialogRef.close(this.userAccount);
  }
}
