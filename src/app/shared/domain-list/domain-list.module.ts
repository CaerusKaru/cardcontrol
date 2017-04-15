import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomainListComponent} from "./domain-list.component";
import {ResourceListComponent} from "../resource-list/resource-list.component";
import {MdAutocompleteModule, MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MdAutocompleteModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DomainListComponent,
    ResourceListComponent
  ],
  exports: [
    DomainListComponent,
    ResourceListComponent
  ]
})
export class DomainListModule { }
