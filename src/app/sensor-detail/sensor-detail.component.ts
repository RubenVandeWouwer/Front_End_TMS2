import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensor.service';
import { ActivatedRoute } from '@angular/router';
import { Sensor } from '../models/sensor';
import * as apex from 'ng-apexcharts';
import { PumpService } from '../services/pump.service';
import { OldPumpService } from '../services/old-pump.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Pump } from '../models/pump';
import { OldPump } from '../models/oldPump';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css'],
})
export class SensorDetailComponent implements OnInit {
  sensor!: Sensor;
  sensorChart = [] as number[];
  dropdownListPump!: Pump[];
  dropdownListOldPump!: OldPump[];
  dropdownSettingsPump: IDropdownSettings = {};
  dropdownSettingsOldPump: IDropdownSettings = {};
  pumps = [] as Pump[];
  oldPumps = [] as OldPump[];
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  xaxis!: apex.ApexXAxis;
  checkButton = true;
  intervalId: any;

  constructor(
    private SensorService: SensorService,
    private route: ActivatedRoute,
    private pumpService: PumpService,
    private oldPumpService: OldPumpService
  ) {}

  ngOnInit(): void {
    const sensorId = this.route.snapshot.paramMap.get('id');

    this.pumpService.getPumps().subscribe((x) => {
      this.dropdownListPump = x.filter((x) => x.sensorId == null);
    });
    this.oldPumpService.getOldPumps().subscribe((x) => {
      this.dropdownListOldPump = x.filter((x) => x.sensorId == null);
    });
    this.dropdownSettingsPump = {
      idField: 'id',
      textField: `name`,
    };
    this.dropdownSettingsOldPump = {
      idField: 'id',
      textField: `name`,
    };
    if (sensorId != null) {
      this.getSensorData(+sensorId)
      this.buildChart();
      this.intervalId = setInterval(() => {
        this.getSensorData(+sensorId);
      }, 20000);
      this.intervalId = setInterval(() => {
        this.buildChart();
      }, 20000);
    }
  }

  getSensorData(sensorId: number) {
    this.SensorService.getSensorById(sensorId).subscribe((result) => {
      this.sensor = result;
      result.sensorValues.map((x) => {
        this.sensorChart.push(x.value);
      });
      console.log(this.sensorChart);
      this.title = { text: this.sensor.name };
    });
  }

  buildChart() {
    this.series = [{ name: 'Pressure', data: this.sensorChart }];
    this.chart = { type: 'line' };
    this.xaxis = { labels: { show: false } };
  }

  onPumpSelect(item: any) {
    this.pumpService.getPumpById(item.id).subscribe((x) => {
      this.pumps.push(x);
    });
  }

  onPumpDeSelect(item: any) {
    this.pumps = this.pumps.filter((x) => x.id != item.id);
  }

  onSelectAllPumps(items: any) {
    items.map((x: Sensor) => {
      this.pumpService.getPumpById(x.id).subscribe((x) => {
        this.pumps.push(x);
      });
    });
  }

  onUnSelectAllPumps() {
    this.pumps = [];
  }

  onSelectAllOldPumps(items: any) {
    items.map((x: Sensor) => {
      this.oldPumpService.getOldPumpById(x.id).subscribe((x) => {
        this.oldPumps.push(x);
      });
    });
  }

  onUnSelectAllOldPumps() {
    this.oldPumps = [];
  }

  onOldPumpSelect(item: any) {
    this.oldPumpService.getOldPumpById(item.id).subscribe((x) => {
      this.oldPumps.push(x);
    });
  }

  onOldPumpDeSelect(item: any) {
    this.oldPumps = this.oldPumps.filter((x) => x.id != item.id);
  }

  submitPumps() {
    if (this.pumps != []) {
      this.pumps.map((p) => {
        p.sensorId = this.sensor.id;
        this.pumpService.updatePump(p.id, p).subscribe(() => {
          this.ngOnInit();
        });
      });
    }
    if (this.oldPumps != []) {
      this.oldPumps.map((p) => {
        p.sensorId = this.sensor.id;
        this.oldPumpService.updateOldPump(p.id, p).subscribe(() => {
          this.ngOnInit();
        });
      });
    }
  }

  deleteOldPump(pump: OldPump) {
    if (confirm(`Are you sure you want to delete ${pump.name}`)) {
      this.oldPumpService.getOldPumpById(pump.id).subscribe((x) => {
        x.sensorId = null;
        this.oldPumpService.updateOldPump(x.id, x).subscribe(() => {
          this.ngOnInit();
        });
      });
    }
  }

  deletePump(pump: Pump) {
    if (confirm(`Are you sure you want to delete ${pump.name}`)) {
      this.pumpService.getPumpById(pump.id).subscribe((x) => {
        x.sensorId = null;
        this.pumpService.updatePump(x.id, x).subscribe(() => {
          this.ngOnInit();
        });
      });
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
