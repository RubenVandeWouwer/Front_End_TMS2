import { Component, OnInit } from '@angular/core';
import * as apex from 'ng-apexcharts';

@Component({
  selector: 'app-pumpchart',
  templateUrl: './pumpchart.component.html',
  styleUrls: ['./pumpchart.component.css']
})
export class PumpchartComponent implements OnInit {

  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;


  constructor() { }

  ngOnInit(): void {
    this.title = {text: 'test'};
    this.series = [{name: 'java', data: [2,4,5,8]}];
    this.chart = {type:'bar'}
  }

}
