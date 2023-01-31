import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as apex from 'ng-apexcharts';
import {OldPump} from '../models/oldPump';
import {OldPumpService} from '../services/old-pump.service';
import { UserService } from '../shared/services/user-service.service';

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
  isAdmin!: boolean;

  form: any = {
    inputValue: null,
  };

  constructor(
    private oldPumpService: OldPumpService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((x) => {
      this.isAdmin = x.isAdmin;
    })
    const pumpId = this.route.snapshot.paramMap.get('id');
    if (pumpId != null) {
      this.getOldPumpData(+pumpId)
      this.buildChart()
      this.intervalId = setInterval(() => {
        this.getOldPumpData(+pumpId);
        this.buildChart();
      }, 10000);
    }
  }

  getOldPumpData(pumpId: number) {
    this.pumpChart = [];
    this.oldPumpService.getOldPumpById(+pumpId).subscribe((result) => {
      this.pump = result;
      result.oldPumpValues.map((x) => {
        this.pumpChart.push(x.value);
      });
      console.log(this.pump.name);
      this.title = {text: this.pump.name};
    });
  }

  buildChart() {
    this.series = [{name: 'Ampere', data: this.pumpChart}];
    this.chart = {type: 'line'};
    this.xaxis = {labels: {show: false}};
  }

  repairPump() {
    if (confirm('Are you sure the pump is repaired?')) {
      this.pump.isUserInput = false;
      this.pump.isDefective = false;
      this.pump.repair = true;
      this.oldPumpService.updateOldPump(this.pump.id, this.pump).subscribe();
    }
  }

  updateInputValue() {
    this.pump.isUserInput = true;
    this.pump.isDefective = false;
    this.pump.inputValue = !this.pump.inputValue;
    this.oldPumpService.updateOldPump(this.pump.id, this.pump).subscribe();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
