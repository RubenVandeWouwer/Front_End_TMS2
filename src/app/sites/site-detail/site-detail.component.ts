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
            this.sensor = s;
            // alle waarden in de valuelist steken
            s.sensorValues?.map((x) => {
              this.valuelist.push(x.value);
            });
            //object maken
            this.dataItem = { name: x.name, data: this.valuelist };
            //object in de lijst plaatsen
            this.datalist.push(this.dataItem);
            // valuelist leegmaken voor de volgende iteratie
            this.valuelist = [];
            // this.series.push({name: this.dataItem.name.toString(), data: this.dataItem.data},);
            console.log(this.datalist);
            console.log(this.dataItem);
            // this.series.push(this.dataItem);
          });
        });
        this.series!= this.datalist;
      });
    }
    this.title = { text: 'Water level' };
    this.series = [
      { name: 'Sensor1', data: [50, 40, 30, 20, 15, 13, 10] },
      { name: 'Sensor 2', data: [55, 43, 34, 19, 12, 10, 9] },
    ];
    this.chart = { type: 'line' };
  }
}
