import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerMainComponent } from './manager-main/manager-main.component';
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ManagerRoutingModule} from "./manager-routing.module";
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerSearchComponent } from './manager-search/manager-search.component';
import { ManagerCreateIdComponent } from './manager-create-id/manager-create-id.component';
import { ManagerCreateBuildingComponent } from './manager-create-building/manager-create-building.component';
import { ManagerBuildingsComponent } from './manager-buildings/manager-buildings.component';
import { ManagerAccountComponent } from './manager-account/manager-account.component';
import { ManagerRequestsComponent } from './manager-requests/manager-requests.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ManagerRoutingModule
  ],
  declarations: [ManagerMainComponent, ManagerHomeComponent, ManagerSearchComponent, ManagerCreateIdComponent, ManagerCreateBuildingComponent, ManagerBuildingsComponent, ManagerAccountComponent, ManagerRequestsComponent]
})
export class ManagerModule { }
