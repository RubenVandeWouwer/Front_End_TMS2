import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pump } from '../models/pump';
import { PumpService } from '../services/pump.service';
import { SiteService } from '../services/site.service';
import * as apex from 'ng-apexcharts';

@Component({
  selector: 'app-pump-detail',
  templateUrl: './pump-detail.component.html',
  styleUrls: ['./pump-detail.component.css'],
})
export class PumpDetailComponent implements OnInit {
  pump!: Pump;
  pumpChart= [] as number[];
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  xaxis!: apex.ApexXAxis

  constructor(
    private pumpService: PumpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const pumpId = this.route.snapshot.paramMap.get('id');
    console.log(pumpId);
    if (pumpId != null) {
      this.pumpService.getPumpById(+pumpId).subscribe((result) => {
        this.pump = result;
        result.pumpValues.map((x) => {
          this.pumpChart.push(x.value);
        });
        console.log(this.pumpChart);
      });
      this.title = {text: "Pump"};
      this.series = [{name: 'Ampere', data: this.pumpChart}];
      this.chart = {type:'line'}
      this.xaxis = {
        categories: [
          "taart",
        ]
      }
    }
  }
}
