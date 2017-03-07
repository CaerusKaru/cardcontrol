import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {UserRequestComponent} from './user-request/user-request.component';
import {UserAreaComponent} from './user-area/user-area.component';
import { UserHomeComponent } from './user-home/user-home.component';
import {UserIdComponent} from "./user-id/user-id.component";
import {UserAccountComponent} from "./user-account/user-account.component";

const userRoutes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      {
        path: '',
        component: UserIdComponent
      },
      {
        path: 'areas',
        component: UserAreaComponent
      },
      {
        path: 'request',
        component: UserRequestComponent
      },
      {
        path: 'account',
        component: UserAccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}

