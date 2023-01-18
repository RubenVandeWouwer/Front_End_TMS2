import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule, FormsModule, AppRoutingModule
  ], exports: [
    FormsModule]
})
export class SharedModule {
}
