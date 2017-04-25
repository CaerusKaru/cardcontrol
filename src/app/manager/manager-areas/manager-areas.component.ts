import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../../shared/user_account';
import {UserService} from '../../user/shared/user.service';
import {AccessPoint} from '../../shared/access-point';
import {ManagedResource} from '../../shared/managed-resource';
import {RequestService} from '../../request/request.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-manager-areas',
  templateUrl: './manager-areas.component.html',
  styleUrls: ['./manager-areas.component.scss']
})
export class ManagerAreasComponent implements OnInit {

  constructor(
    private userService : UserService,
    private requestService : RequestService,
    private dialog : MdDialog
  ) { }

  ngOnInit() {
    this.userService.userAccount.subscribe(data => {
      this.userAccount = data;
      this.initData();
    });
  }

  public createResource = false;
  public userAccount : UserAccount;
  public selectedResource : ManagedResource;
  public selectedAP : AccessPoint;
  public resources : ManagedResource[] = [];

  public openResource (resource : ManagedResource, index : number) {
    this.createResource = false;
    this.selectedAP = null;
    this.selectedResource = resource;
  }

  public create () {
    this.selectedResource = null;
    this.selectedAP = null;
    this.createResource = true;
  }

  public add () {
    let dialogRef = this.dialog.open(ManagerAreasDialogAddComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      let newAp : AccessPoint = {
        access_point_name: data,
        id: -1,
        resource_uri: '',
        parent: this.selectedResource.resource_uri,
        users: [],
        created_by: this.userAccount.resource_uri,
        modified_by: this.userAccount.resource_uri
      };
      this.requestService.makeAccessPoint(newAp).subscribe(data => {
        this.selectedResource.children.push(data);
      });
    });
  }

  public chooseAP (accessPoint : AccessPoint, index : number) {
    this.selectedAP = accessPoint;
    let dialogRef = this.dialog.open(ManagerAreasDialogComponent);
    dialogRef.componentInstance.ap = Object.assign({}, this.selectedAP);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.requestService.updateAccessPoint(data);
        this.selectedResource.children[index] = data;
      }
    });
  }

  private manageAps : AccessPoint[];

  private initData () {
    if (this.userAccount.manager_level < 2) {
      this.manageAps = this.userAccount.access_points_managed;
      // let apIdReqs = this.manageAps.map(d => { return this.requestService.getRequestsForAp(d.id) });
      this.userService.userResources.filter(data => data !== null).subscribe(data => {
        this.resources = data;
      });
    } else {
      this.requestService.getResources().subscribe(data => {
        this.resources = data;
        // this.manageAps = data.reduce((a, d) => a.concat(d.children), []);
        // let apIdReqs = this.manageAps.map(d => { return this.requestService.getRequestsForAp(d.id) });
      });
    }
  }

}

@Component({
  selector: 'app-manager-areas-add-dialog',
  template: `
    <div fxLayout="column" class="mat-app-background unicorn-dark-theme">
      <md-toolbar color="accent">
        <span>Create Access Point</span>
        <span fxFlex="25px"></span>
        <span fxFlex></span>
        <button md-icon-button md-dialog-close><md-icon>close</md-icon></button>
      </md-toolbar>
      <md-card fxLayout="column">
        <div fxLayout="column">
          <md-input-container>
            <input mdInput type="text" [(ngModel)]="name" placeholder="Access Point Name" required>
          </md-input-container>
          <md-error *ngIf="error">Name cannot be blank</md-error>
        </div>
        <span fxFlex="20px"></span>
        <button md-raised-button color="accent" fxLayoutAlign="center center" (click)="save()">SAVE</button>
      </md-card>
    </div>
  `
})
export class ManagerAreasDialogAddComponent {
  constructor (
    public dialogRef : MdDialogRef<ManagerAreasDialogAddComponent>
  ) {
  }

  public name : string;
  public error : boolean = false;

  public save () {
    if (!this.name) {
      this.error = true;
      return;
    }
    this.dialogRef.close(this.name);
  }
}

@Component({
  selector: 'app-manager-areas-dialog',
  template: `
  <div fxLayout="column" class="mat-app-background unicorn-dark-theme">
    <md-toolbar color="accent">
      <span>{{ap.access_point_name}}</span>
      <span fxFlex="25px"></span>
      <span fxFlex></span>
      <button md-icon-button md-dialog-close><md-icon>close</md-icon></button>
    </md-toolbar>
    <md-card fxLayout="column">
      <div fxLayout="column">
        <md-input-container>
          <input mdInput type="text" [(ngModel)]="ap.access_point_name" placeholder="Access Point Name" required>
        </md-input-container>
        <md-error *ngIf="error">Name cannot be blank</md-error>
      </div>
      <md-list>
        <md-list-item *ngFor="let user of users; let i = index">
          <md-checkbox [(ngModel)]="selected[i]">{{user}}</md-checkbox>
        </md-list-item>
      </md-list>
      <span fxFlex="20px"></span>
      <button md-raised-button color="accent" fxLayoutAlign="center center" (click)="save()">SAVE</button>
    </md-card>
  </div>
  `
})
export class ManagerAreasDialogComponent implements OnInit {

  constructor(
    private requestService : RequestService,
    public dialogRef : MdDialogRef<ManagerAreasDialogComponent>
  ) {
  }

  ngOnInit () {
    let uaReqs : Observable<UserAccount>[] = this.ap.users.map(a => { return this.requestService.getUserAccountById(a) });
    Observable.forkJoin(uaReqs).subscribe(data => {
      this.userAccounts = data.map(a => a);
      this.users = this.userAccounts.map(d => d.utln);
      this.selected = this.users.map(a => true);
    })
  }

  public error = false;
  public selected : boolean[] = [];
  public users : string [] = [];
  public ap : AccessPoint;

  public save () {
    if (!this.ap.access_point_name) {
      this.error = true;
      return;
    }
    console.log(this.selected);
    console.log(this.users.filter((a, i) => this.selected[i]));
    console.log(this.users.filter((a, i) => !this.selected[i]));
    this.ap.users = this.ap.users.filter((a, i) => this.selected[i]);
    this.dialogRef.close(this.ap);
  }

  private userAccounts : UserAccount[] = [];
}
