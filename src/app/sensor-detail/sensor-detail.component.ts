import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from '../models/sensor';
import * as apex from 'ng-apexcharts';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {

  sensor!: Sensor;
  sensorChart= [] as number[];
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  xaxis!: apex.ApexXAxis

  constructor(private SensorService: SensorService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const sensorId = this.route.snapshot.paramMap.get('id');
    console.log(sensorId);
    if (sensorId != null) {
      this.SensorService.getSensorById(+sensorId).subscribe((result) => {
        this.sensor = result;
        result.sensorValues.map((x) => {
          this.sensorChart.push(x.value);
        });
        console.log(this.sensorChart);
      });
      this.title = {text: "Sensor"};
      this.series = [{name: 'Pressure', data: this.sensorChart}];
      this.chart = {type:'line'}
    }
  }

}
