import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Pump} from '../models/pump';
import {PumpService} from '../services/pump.service';
import {SiteService} from '../services/site.service';
import * as apex from 'ng-apexcharts';
import {UserService} from '../shared/services/user-service.service';

@Component({
  selector: 'app-pump-detail',
  templateUrl: './pump-detail.component.html',
  styleUrls: ['./pump-detail.component.css'],
})
export class PumpDetailComponent implements OnInit {
  pump!: Pump;
  pumpChart = [] as number[];
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  xaxis!: apex.ApexXAxis;
  pumpId!: any;
  checkButton = true;
  intervalId: any;
  isAdmin!: boolean;

  constructor(
    private pumpService: PumpService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((x) => {
      this.isAdmin = x.isAdmin;
    })
    const pumpId = this.route.snapshot.paramMap.get('id');
    console.log(this.pumpId);
    if (pumpId != null) {
      this.getPumpData(+pumpId);
      this.intervalId = setInterval(() => {
        this.getPumpData(+pumpId)
        this.buildChart();
      }, 20000);
    }
    this.buildChart();
    console.log('Builded chart');
  }

  getPumpData(pumpId: number) {
    this.pumpChart = [];
    this.pumpService.getPumpById(pumpId).subscribe((result) => {
      this.pump = result;

      result.pumpValues.map((x) => {
        this.pumpChart.push(x.value);
      });
      console.log(this.pumpChart);
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
      this.pump.isDefective = false;
      this.pump.repair = true;
      this.pump.inputValue = 0.0;
      this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((user) => {
        this.pump.user = user.name;
        this.pumpService.updatePump(this.pump.id, this.pump).subscribe(() => {
          this.ngOnInit();
        });
      })
    }
  }

  updateInputValue() {
    this.pump.isUserInput = true;
    this.pump.isDefective = false;
    this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((user) => {
      this.pump.user = user.name;
      this.pumpService.updatePump(this.pump.id, this.pump).subscribe(() => {
        this.ngOnInit();
      });
    })

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
