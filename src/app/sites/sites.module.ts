import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SitesComponent} from "./sites/sites.component";
import {SiteComponent} from "./site/site.component";
import {SiteDetailComponent} from "./site-detail/site-detail.component";
import {SharedModule} from "../shared/shared.module";
import {RouterLink} from "@angular/router";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {PumpDetailComponent} from "../pump-detail/pump-detail.component";
import {PumpComponent} from "../pump/pump.component";
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [SitesComponent,
    SiteComponent,
    SiteDetailComponent, PumpDetailComponent, PumpComponent],
  imports: [
    CommonModule, SharedModule, RouterLink, NgMultiSelectDropDownModule, NgApexchartsModule
  ],
  exports: [SitesComponent,
    SiteComponent,
    SiteDetailComponent]
})
export class SitesModule {
}
