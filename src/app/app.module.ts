import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { ManagerModule } from './manager/manager.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RequestService} from "./request/request.service";
import {UserService} from "./user/shared/user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MaterialModule,
    UserModule,
    ManagerModule,
    AppRoutingModule
  ],
  providers: [RequestService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
