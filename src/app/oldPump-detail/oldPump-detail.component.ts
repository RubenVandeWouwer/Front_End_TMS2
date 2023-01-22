import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as apex from 'ng-apexcharts';
import {OldPump} from "../models/oldPump";
import {OldPumpService} from "../services/old-pump.service";

@Component({
  selector: 'app-pump-detail',
  templateUrl: './oldPump-detail.component.html',
  styleUrls: ['./oldPump-detail.component.css'],
})
export class OldPumpDetailComponent implements OnInit {
  pump!: OldPump;
  pumpChart= [] as number[];
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  xaxis!: apex.ApexXAxis

  constructor(
    private oldPumpService: OldPumpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const pumpId = this.route.snapshot.paramMap.get('id');
    if (pumpId != null) {
      this.oldPumpService.getOldPumpById(+pumpId).subscribe((result) => {
        this.pump = result;
        result.oldPumpValues.map((x) => {
          this.pumpChart.push(x.value);
        });
        console.log(this.pump.name);
        this.title= {text: this.pump.name}
      });
      // this.title = {text: this.pump.name};
      this.series = [{name: 'Ampere', data: this.pumpChart}];
      this.chart = {type:'line'}
      this.xaxis = {
        categories: [
          "text",
        ]
      }
    }
  }
}
