import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pump } from '../models/pump';
import { PumpService } from '../services/pump.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-pump-detail',
  templateUrl: './pump-detail.component.html',
  styleUrls: ['./pump-detail.component.css']
})
export class PumpDetailComponent implements OnInit {
  pump!: Pump;

  constructor(
    private pumpService: PumpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const pumpId = this.route.snapshot.paramMap.get('id');
    console.log(pumpId);
    if (pumpId != null) {
      this.pumpService
        .getPumpById(+pumpId)
        .subscribe((result) => (this.pump = result));
    }
  }
}
