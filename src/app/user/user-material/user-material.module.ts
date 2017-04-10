import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdDialogModule, MdGridListModule, MdInputModule, MdListModule,
  MdSidenavModule, MdSnackBarModule,
  MdTabsModule, MdToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdDialogModule,
    MdTabsModule,
    MdListModule,
    MdGridListModule,
    MdCardModule,
    MdToolbarModule,
    MdSnackBarModule
  ],
  declarations: []
})
export class UserMaterialModule { }
