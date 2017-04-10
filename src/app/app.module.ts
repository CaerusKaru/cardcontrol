import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { ManagerModule } from './manager/manager.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RequestService} from "./request/request.service";
import {UserService} from "./user/shared/user.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppMaterialModule} from "./app-material/app-material.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    AppMaterialModule,
    UserModule,
    ManagerModule,
    AppRoutingModule
  ],
  providers: [RequestService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
