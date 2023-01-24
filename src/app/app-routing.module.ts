import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PumpDetailComponent } from './pump-detail/pump-detail.component';
import { SiteDetailComponent } from './sites/site-detail/site-detail.component';
import { SitesComponent } from './sites/sites/sites.component';
import { SensorDetailComponent } from './sensor-detail/sensor-detail.component';
import {OldPumpDetailComponent} from "./oldPump-detail/oldPump-detail.component";
import { PumplogComponent } from './pumplog/pumplog.component';
import { SensorlogComponent } from './sensorlog/sensorlog.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sites', component: SitesComponent},
  {path: 'sites/details', component: SiteDetailComponent},
  { path: 'site/:id', component: SiteDetailComponent },
  { path: 'pump/:id', component: PumpDetailComponent },
  { path: 'oldPump/:id', component: OldPumpDetailComponent },
  {path: 'sensor/:id', component: SensorDetailComponent},
  {path: 'pumplog/:id', component: PumplogComponent},
  {path: 'sensorlog/:id', component: SensorlogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
