import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SitesComponent } from './sites/sites.component';
import { SiteComponent } from './site/site.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { PumpComponent } from './pump/pump.component';
import { PumpDetailComponent } from './pump-detail/pump-detail.component';
import { LogComponent } from './log/log.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SitesComponent,
    SiteComponent,
    SiteDetailComponent,
    PumpComponent,
    PumpDetailComponent,
    LogComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
