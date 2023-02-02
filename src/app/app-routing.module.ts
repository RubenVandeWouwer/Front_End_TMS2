import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {PumpDetailComponent} from './pump-detail/pump-detail.component';
import {SiteDetailComponent} from './sites/site-detail/site-detail.component';
import {SitesComponent} from './sites/sites/sites.component';
import {SensorDetailComponent} from './sensor-detail/sensor-detail.component';
import {OldPumpDetailComponent} from "./oldPump-detail/oldPump-detail.component";
import {SensorlogComponent} from './sensorlog/sensorlog.component';
import {LogCollComponent} from './log-coll/log-coll.component';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {VerifiedComponent} from "./verified/verified.component";
import {IsVerifiedGuard} from "./shared/guard/is-verified.guard";
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {WhitePageComponent} from "./white-page/white-page.component";
import {LoginGuard} from "./shared/guard/login.guard";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'sites', component: SitesComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'splashScreen', component: WhitePageComponent},
  {path: 'verified', component: VerifiedComponent},
  {path: 'sites/details', component: SiteDetailComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'site/:id', component: SiteDetailComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'pump/:id', component: PumpDetailComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'oldPump/:id', component: OldPumpDetailComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'sensor/:id', component: SensorDetailComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'sensorlog/:id', component: SensorlogComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'site/:id/logcoll', component: LogCollComponent, canActivate: [AuthGuard, IsVerifiedGuard]},
  {path: 'test', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent},
  {path: 'manage-users', component: ManageUsersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
