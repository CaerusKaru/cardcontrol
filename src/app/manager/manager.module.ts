import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerMainComponent } from './manager-main/manager-main.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ManagerRoutingModule} from "./manager-routing.module";
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerAccountComponent } from './manager-account/manager-account.component';
import { ManagerRequestsComponent } from './manager-requests/manager-requests.component';
import {ManagerMaterialModule} from "./manager-material/material.module";
import {ManagerService} from "./manager.service";
import {
  ManagerUsersAccessComponent,
  ManagerUsersComponent, ManagerUsersConfirmComponent,
  ManagerUsersDialogComponent
} from './manager-users/manager-users.component';
import { ManagerAreasComponent } from './manager-areas/manager-areas.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DomainListModule} from "../shared/domain-list/domain-list.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagerMaterialModule,
    FlexLayoutModule,
    ManagerRoutingModule,
    DomainListModule
  ],
  declarations: [
    ManagerMainComponent,
    ManagerHomeComponent,
    ManagerAccountComponent,
    ManagerRequestsComponent,
    ManagerUsersComponent,
    ManagerAreasComponent,
    ManagerUsersDialogComponent,
    ManagerUsersConfirmComponent,
    ManagerUsersAccessComponent
  ],
  providers: [
    ManagerService
  ],
  bootstrap: [
    ManagerUsersComponent,
    ManagerUsersDialogComponent,
    ManagerUsersConfirmComponent,
    ManagerUsersAccessComponent
  ]
})
export class ManagerModule { }
