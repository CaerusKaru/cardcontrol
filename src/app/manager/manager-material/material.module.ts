import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdGridListModule, MdIconModule, MdInputModule,
  MdListModule, MdProgressSpinnerModule,
  MdSelectModule,
  MdSidenavModule, MdSlideToggleModule,
  MdTabsModule, MdToolbarModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdSidenavModule,
    MdCardModule,
    MdListModule,
    MdTabsModule,
    MdInputModule,
    MdButtonModule,
    MdGridListModule,
    MdIconModule,
    MdToolbarModule,
    MdSelectModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdSlideToggleModule,
    MdCheckboxModule,
    MdProgressSpinnerModule
  ],
  declarations: []
})
export class ManagerMaterialModule { }
