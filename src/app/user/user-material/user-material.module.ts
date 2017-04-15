import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdGridListModule, MdIconModule,
  MdInputModule, MdListModule, MdMenuModule, MdSelectModule, MdSnackBarModule, MdTabsModule, MdToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdCardModule,
    MdButtonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdDialogModule,
    MdTabsModule,
    MdListModule,
    MdGridListModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdMenuModule,
    MdIconModule,
    MdCheckboxModule,
    MdSelectModule
  ]
})
export class UserMaterialModule { }
