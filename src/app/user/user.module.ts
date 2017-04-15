import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import {UserIdComponent, UserIdRequestDialog} from './user-id/user-id.component';
import {UserAreaCommentDialog, UserAreaComponent, UserAreaDialog} from './user-area/user-area.component';
import {UserRequestComponent, UserRequestDialogComponent} from './user-request/user-request.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserMaterialModule} from "./user-material/user-material.module";
import {DomainListModule} from "../shared/domain-list/domain-list.module";

@NgModule({
  imports: [
    UserMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule,
    UserRoutingModule,
    DomainListModule
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
    UserAreaCommentDialog
  ],
  bootstrap: [
    UserAreaComponent,
    UserAreaDialog,
    UserIdComponent,
    UserIdRequestDialog,
    UserRequestComponent,
    UserRequestDialogComponent,
    UserAreaCommentDialog
  ],
  providers: [
  ]
})
export class UserModule { }
