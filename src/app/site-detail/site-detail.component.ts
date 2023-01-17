import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Site } from '../models/site';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css'],
})
export class SiteDetailComponent implements OnInit {
  site!: Site;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    console.log(siteId);
    if (siteId != null) {
      this.siteService
        .getSiteById(+siteId)
        .subscribe((result) => (this.site = result));
    }
  }
}
