import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {UserIdComponent, UserIdRequestDialog} from './user-id/user-id.component';
import {UserAreaComponent, UserAreaDialog} from './user-area/user-area.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserAccountComponent } from './user-account/user-account.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
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
    UserIdRequestDialog
  ],
  bootstrap: [
    UserAreaComponent,
    UserAreaDialog,
    UserIdComponent,
    UserIdRequestDialog
  ],
  providers: [
  ]
})
export class UserModule { }
