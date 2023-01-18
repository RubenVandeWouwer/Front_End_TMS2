import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SitesComponent} from "./sites/sites.component";
import {SiteComponent} from "./site/site.component";
import {SiteDetailComponent} from "./site-detail/site-detail.component";
import {SharedModule} from "../shared/shared.module";
import { PumpComponent } from '../pump/pump.component';
import { PumpDetailComponent } from '../pump-detail/pump-detail.component';


@NgModule({
  declarations: [SitesComponent,
    SiteComponent,
    SiteDetailComponent, PumpComponent, PumpDetailComponent],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [SitesComponent,
    SiteComponent,
    SiteDetailComponent]
})
export class SitesModule {
}
