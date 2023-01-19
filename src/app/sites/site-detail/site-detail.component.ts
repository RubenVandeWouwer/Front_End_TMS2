import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Site } from '../../models/site';
import { Sensor } from '../../models/sensor';
import { SiteService } from '../../services/site.service';
import * as apex from 'ng-apexcharts';
import { SensorService } from '../../services/sensor.service';
import { DataList } from '../../models/DataList';

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
  sensors!: Sensor[];
  sensor!: Sensor;
  datalist = [] as DataList[];
  dataItem!: DataList;
  valuelist = [] as number[];

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    console.log(siteId);
    if (siteId != null) {
      this.siteService.getSiteById(+siteId).subscribe((result) => {
        this.site = result;
        result.sensors.map((x) => {
          this.sensorService.getSensorById(x.id).subscribe((s) => {
            console.log('sensorvalues:' + s.sensorValues);
            this.sensor = s;
            console.log('sensorname:' + x.name);
            // alle waarden in de valuelist steken
            s.sensorValues?.map((x) => {
              this.valuelist.push(x.value);
            });
            console.log('valuelist ' + this.valuelist);
            //object maken
            this.dataItem = [x.name, this.valuelist]
            // this.datalist.push(x.name, this.valuelist)

            //object in de lijst plaatsen
            this.datalist.push(this.dataItem)

            // valuelist leegmaken voor de volgende iteratie
            this.valuelist = [];
          });
        });
      });
    }
    this.title = { text: 'Water level' };
    this.series = [
      { name: 'Sensor1 Meters', data: [50, 40, 30, 80, 17, 45, 10].reverse() },
      { name: 'Sensor 2 Meters', data: [50, 40, 30, 80, 17, 45, 10] },
    ];
    this.chart = { type: 'line' };
  }
}
