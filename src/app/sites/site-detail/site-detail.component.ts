import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pump } from 'src/app/models/pump';
import { PumpService } from 'src/app/services/pump.service';
import { Site } from '../../models/site';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css'],
})
export class SiteDetailComponent implements OnInit {
  site!: Site;
  pumps$!: Observable<Pump[]>;
  pump!: Pump[];


  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private pumpService: PumpService
  ) {}


  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    console.log(siteId);
    if (siteId != null) {
      this.siteService
        .getSiteById(+siteId)
        .subscribe((result) => {this.site = result
          console.log(this.site)});
    }

  }
}
