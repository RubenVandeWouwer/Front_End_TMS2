import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PumpDetailComponent} from './pump-detail/pump-detail.component';
import {SiteDetailComponent} from './sites/site-detail/site-detail.component';
import {SitesComponent} from './sites/sites/sites.component';
import {SensorDetailComponent} from './sensor-detail/sensor-detail.component';
import {OldPumpDetailComponent} from "./oldPump-detail/oldPump-detail.component";

import { SensorlogComponent } from './sensorlog/sensorlog.component';
import { LogCollComponent } from './log-coll/log-coll.component';

import {PumplogComponent} from './pumplog/pumplog.component';
import {SensorlogComponent} from './sensorlog/sensorlog.component';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {AuthGuard} from "./shared/guard/auth.guard";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sites', component: SitesComponent},
  {path: 'sites/details', component: SiteDetailComponent},
  {path: 'site/:id', component: SiteDetailComponent},
  {path: 'pump/:id', component: PumpDetailComponent},
  {path: 'oldPump/:id', component: OldPumpDetailComponent},
  {path: 'sensor/:id', component: SensorDetailComponent},
  {path: 'sensorlog/:id', component: SensorlogComponent},

  {path: 'site/:id/logcoll', component: LogCollComponent},

  {path: 'test', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
