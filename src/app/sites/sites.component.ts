import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Site } from '../site';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  constructor(private siteService: SiteService) { }

  sites: Site[] = [];

  ngOnInit(): void {
    this.sites = this.siteService.getSites();
  }

  public routeToSite(){
    window.location.replace("sites/details");
  }

}
