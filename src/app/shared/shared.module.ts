import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'

@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, AppRoutingModule, NgMultiSelectDropDownModule.forRoot()
  ], exports: [
    FormsModule]
})
export class SharedModule {
}
