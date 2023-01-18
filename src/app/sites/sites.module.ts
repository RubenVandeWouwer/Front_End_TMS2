import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SitesComponent} from "./sites/sites.component";
import {SiteComponent} from "./site/site.component";
import {SiteDetailComponent} from "./site-detail/site-detail.component";
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";



@NgModule({
  declarations: [SitesComponent,
    SiteComponent,
    SiteDetailComponent],
  imports: [
    CommonModule, SharedModule, RouterLink, NgMultiSelectDropDownModule
  ],
  exports: [SitesComponent,
    SiteComponent,
    SiteDetailComponent]
})
export class SitesModule {
}
