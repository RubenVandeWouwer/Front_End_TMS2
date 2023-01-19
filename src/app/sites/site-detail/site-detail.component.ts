import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Site} from '../../models/site';
import {Sensor} from '../../models/sensor';
import {SiteService} from '../../services/site.service';
import * as apex from 'ng-apexcharts';
import {SensorService} from "../../services/sensor.service";

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css'],
})
export class SiteDetailComponent implements OnInit {
  site!: Site;
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  sensorChart=  [] as number[];

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private sensorService : SensorService
  ) {
  }

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    console.log(siteId);
    if (siteId != null) {
      this.siteService
        .getSiteById(+siteId)
        .subscribe((result) => {
          this.site = result;
          result.sensors.map((x) => {
            this.sensorService.getSensorById(x.id).subscribe((s)=>{
              console.log(s.sensorValues)
            })
          })
        });

    }
    this.title = {text: "Water level"};
      this.series = [{name: 'Sensor1 Meters', data: [50,40,30,80,17,45,10].reverse()}, {name: 'Ampere', data: [50,40,30,80,17,45,10]}];
      this.chart = {type:'line'}
  }
}
