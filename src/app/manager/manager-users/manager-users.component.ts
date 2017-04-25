import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/user";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {RequestService} from "../../request/request.service";
import {ManagedResource} from "../../shared/managed-resource";
import {UserService} from "../../user/shared/user.service";
import {MdDialog, MdDialogRef, MdSnackBar} from "@angular/material";
import {UserAccount} from "../../shared/user_account";
import {Domain} from "../../shared/domain";
import {AccessPoint} from "../../shared/access-point";

@Component({
  selector: 'app-manager-users',
  templateUrl: './manager-users.component.html',
  styleUrls: ['./manager-users.component.scss']
})
export class ManagerUsersComponent implements OnInit {

  constructor(
    private snackbar : MdSnackBar,
    public dialog : MdDialog,
    private userService : UserService,
    private requestService : RequestService
  ) { }

  ngOnInit() {
    this.userControl.valueChanges
      .subscribe(name => {
        this.selectedUser = (typeof name === 'object') ? name : null;
        this.currentQuery = name;
        this.flUsers = this.requestService.getUsersPartial(name);
        if (this.selectedUser) {
          this.newUser = false;
          this.initUser();
        }
      });
  }

  public schools : string[] = ["Liberal Arts", "Engineering", "Other"];
  public types : string[] = ["Undergraduate", "Graduate", "Professor", "Employee", "Other"];

  public newAccessPoints : AccessPoint[];
  public newUser : boolean;
  public currentQuery : string;
  public userAccount : UserAccount;
  public selectedUser : User;
  public userControl = new FormControl();
  public flUsers : Observable<User[]>;
  public resources : Observable<ManagedResource[]>;
  public siteManager : boolean;

  public initUser () {
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

  public createUser () {
    this.newUser = true;
    this.selectedUser = {
      barcode: -1,
      birth_date: '',
      class_year: new Date().getFullYear() + 4,
      first_name: '',
      id: -1,
      jumbocash_id: -1,
      last_name: '',
      middle_initial: '',
      resource_uri: '',
      school: '',
      student_type: '',
      utln: this.currentQuery
    };
    this.userAccount = {
      id : -1,
      first_name : '',
      last_name : '',
      card : '',
      resource_uri : '',
      utln : this.currentQuery,
      manager_level : 0,
      access_points : [],
      access_points_managed : []
    };
    this.siteManager = false;
  }

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
        let newData = Object.assign({}, data);
        newData.access_points = newData.access_points.map(a => a.resource_uri);
        newData.access_points_managed = newData.access_points_managed.map(a => a.resource_uri);
        this.requestService.updateUserAccount(newData);
      }
    });
  }

  public editUser () {
    if (!this.selectedUser) {
      return;
    }
    if (!this.newUser) {
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
    } else {
      this.requestService.makeUser(this.selectedUser).subscribe(
        data => {
          this.selectedUser = data;
          this.userAccount.first_name = this.selectedUser.first_name;
          this.userAccount.last_name = this.selectedUser.last_name;
          this.userAccount.card = data.resource_uri;
          this.userAccount.access_points = this.newAccessPoints;
          this.userAccount.manager_level = this.siteManager ? 2 : this.userAccount.access_points_managed.length !== 0 ? 1 : 0;
          if (this.userAccount.manager_level === 2) {
            let dialogRef = this.dialog.open(ManagerUsersConfirmComponent);
            dialogRef.afterClosed().subscribe(data => {
              if (data) {
                this.requestService.makeUserAccount(this.userAccount).subscribe(
                  data => {
                    this.userAccount = data;
                    this.snackbar.open('User created', '', {
                      duration: 1750
                    });
                  }
                );
              }
            });
          } else {
            this.requestService.makeUserAccount(this.userAccount).subscribe(
              data => {
                this.snackbar.open('Unable to create user', '', {
                  duration: 1750
                });
              }
            );
          }
          this.newUser = false;
        }
      );
    }
  }

  public addAccess () {
    this.requestService.getRootDomain().subscribe(data => {
      let dialogRef = this.dialog.open(ManagerUsersAccessComponent);
      dialogRef.componentInstance.domains = data.domain_children;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          if (!this.newUser) {
            this.requestService.addAccessPoints(this.userAccount, data);
            setTimeout(_ => this.initUser(), 500);
          } else {
            // TODO live update the view from here to allow for management view
            this.newAccessPoints.push(...data);
          }
        }
      });
    });
  }

}

@Component({
  selector: 'app-manager-users-access',
  template: `
    <div class="unicorn-dark-theme mat-app-background" fxLayout="column">
      <md-toolbar class="unicorn-dark-theme mat-app-background" color="accent">Add Access</md-toolbar>
      <md-card>
        <app-domain-list [domains]="domains" [showReason]="false" (addRequest)="addAccess($event)"></app-domain-list>
      </md-card>
    </div>
  `
})
export class ManagerUsersAccessComponent {
  constructor (
    private dialogRef : MdDialogRef<ManagerUsersAccessComponent>
  ) {
  }

  public domains : Domain[];

  public addAccess ($event) {
    this.dialogRef.close($event);
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
