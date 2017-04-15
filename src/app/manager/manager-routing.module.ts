import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManagerMainComponent } from './manager-main/manager-main.component';
import {ManagerHomeComponent} from "./manager-home/manager-home.component";
import {ManagerAccountComponent} from "./manager-account/manager-account.component";
import {ManagerRequestsComponent} from "./manager-requests/manager-requests.component";
import {ManagerGuard} from "../shared/manager.guard";
import {ManagerUsersComponent} from "./manager-users/manager-users.component";
import {ManagerAreasComponent} from "./manager-areas/manager-areas.component";

const managerRoutes: Routes = [
  {
    path: 'manage',
    component: ManagerMainComponent,
    canActivate: [ManagerGuard],
    children: [
      {
        path: '',
        component: ManagerHomeComponent
      },
      {
        path: 'users',
        component: ManagerUsersComponent
      },
      {
        path: 'areas',
        component: ManagerAreasComponent
      },
      {
        path: 'account',
        component: ManagerAccountComponent
      },
      {
        path: 'requests',
        component: ManagerRequestsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(managerRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ManagerGuard
  ]
})
export class ManagerRoutingModule {}

