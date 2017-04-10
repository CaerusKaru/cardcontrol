import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {UserIdComponent, UserIdRequestDialog} from './user-id/user-id.component';
import {UserAreaComponent, UserAreaDialog} from './user-area/user-area.component';
import {UserRequestComponent, UserRequestDialogComponent} from './user-request/user-request.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DomainListComponent } from './user-request/domain-list/domain-list.component';
import {UserMaterialModule} from "./user-material/user-material.module";
import {ResourceListComponent} from "./user-request/resource-list/resource-list.component";

@NgModule({
  imports: [
    UserMaterialModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    UserRoutingModule
  ],
  declarations: [
    UserIdComponent,
    UserAreaComponent,
    UserRequestComponent,
    UserHomeComponent,
    UserAreaDialog,
    UserAccountComponent,
    UserIdRequestDialog,
    UserRequestDialogComponent,
    DomainListComponent,
    ResourceListComponent
  ],
  bootstrap: [
    UserAreaComponent,
    UserAreaDialog,
    UserIdComponent,
    UserIdRequestDialog,
    UserRequestComponent,
    UserRequestDialogComponent
  ],
  providers: [
  ]
})
export class UserModule { }
