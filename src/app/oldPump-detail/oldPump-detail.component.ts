import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as apex from 'ng-apexcharts';
import { OldPump } from '../models/oldPump';
import { OldPumpService } from '../services/old-pump.service';

@Component({
  selector: 'app-pump-detail',
  templateUrl: './oldPump-detail.component.html',
  styleUrls: ['./oldPump-detail.component.css'],
})
export class OldPumpDetailComponent implements OnInit {
  pump!: OldPump;
  pumpChart = [] as number[];
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  xaxis!: apex.ApexXAxis;
  isViewed!: number;
  checkButton = true;
  intervalId: any;

  form: any = {
    inputValue: null,
  };

  constructor(
    private oldPumpService: OldPumpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const pumpId = this.route.snapshot.paramMap.get('id');
    if (pumpId != null) {
      this.getOldPumpData(+pumpId)
      this.buildChart()
      this.intervalId = setInterval(() => {
        this.getOldPumpData(+pumpId);
        this.buildChart();
      }, 5000);
    }
  }

  getOldPumpData(pumpId: number){
    this.pumpChart = [];
    this.oldPumpService.getOldPumpById(+pumpId).subscribe((result) => {
      this.pump = result;
      result.oldPumpValues.map((x) => {
        this.pumpChart.push(x.value);
      });
      console.log(this.pump.name);
      this.title = { text: this.pump.name };
    });
  }

  buildChart(){
    this.series = [{ name: 'Milliampere', data: this.pumpChart }];
    this.chart = { type: 'line' };
    this.xaxis = { labels: { show: false } };
  }

  updateInputValue() {
    this.pump.isUserInput=true;
    this.pump.inputValue = !this.pump.inputValue;
    console.log("hgchfhfhjfj");
    this.oldPumpService.updateOldPump(this.pump.id, this.pump).subscribe();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  // updateInputValue() {
  //   this.pump.inputValue = this.form.inputValue;
  //   console.log(this.pump.inputValue)
  //   console.log(this.pump);
  //   this.oldPumpService.updateOldPump(this.pump.id, this.pump).subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }
}
