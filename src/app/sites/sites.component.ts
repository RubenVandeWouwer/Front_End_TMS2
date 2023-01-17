import { Component, OnInit } from '@angular/core';
import { SiteService } from '../site.service';
import { Site } from '../models/site';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  constructor(private siteService: SiteService) { }

  site$: Observable<Site[]> = new Observable<Site[]>();

  ngOnInit(): void {
    this.site$ = this.siteService.getSites();
  }

}
