import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ManagerMainComponent } from './manager-main/manager-main.component';
import {ManagerHomeComponent} from "./manager-home/manager-home.component";
import {ManagerBuildingsComponent} from "./manager-buildings/manager-buildings.component";
import {ManagerSearchComponent} from "./manager-search/manager-search.component";
import {ManagerCreateIdComponent} from "./manager-create-id/manager-create-id.component";
import {ManagerCreateBuildingComponent} from "./manager-create-building/manager-create-building.component";
import {ManagerAccountComponent} from "./manager-account/manager-account.component";
import {ManagerRequestsComponent} from "./manager-requests/manager-requests.component";

const managerRoutes: Routes = [
  {
    path: 'manage',
    component: ManagerMainComponent,
    children: [
      {
        path: '',
        component: ManagerHomeComponent
      },
      {
        path: 'buildings',
        component: ManagerBuildingsComponent
      },
      {
        path: 'search',
        component: ManagerSearchComponent
      },
      {
        path: 'createID',
        component: ManagerCreateIdComponent
      },
      {
        path: 'createBuilding',
        component: ManagerCreateBuildingComponent
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
  ]
})
export class ManagerRoutingModule {}

