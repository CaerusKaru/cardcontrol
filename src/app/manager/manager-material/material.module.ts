import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdAutocompleteModule,
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdGridListModule, MdIconModule, MdInputModule,
  MdListModule,
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
    MdCheckboxModule
  ],
  declarations: []
})
export class ManagerMaterialModule { }
