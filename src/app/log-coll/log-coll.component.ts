import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Pump} from '../models/pump';
import {Sensor} from '../models/sensor';
import {Site} from '../models/site';
import {PumpService} from '../services/pump.service';
import {SensorService} from '../services/sensor.service';
import {SiteService} from '../services/site.service';
import {LogItem} from '../models/loglist';
import {OldPumpService} from '../services/old-pump.service';

@Component({
  selector: 'app-log-coll',
  templateUrl: './log-coll.component.html',
  styleUrls: ['./log-coll.component.css'],
})
export class LogCollComponent implements OnInit {

  constructor(private siteService: SiteService,
              private route: ActivatedRoute,
              private sensorService: SensorService,
              private pumpService: PumpService,
              private oldPumpService: OldPumpService) {
  }

  logItem!: LogItem;
  logList = [] as LogItem[];
  logListSorted = [] as LogItem[];
  site!: Site;
  sensor!: Sensor;
  pump!: Pump;

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    if (siteId != null) {
      this.getSiteData(+siteId);
      // this.intervalId = setInterval(() => {
      //   this.getSiteData(+siteId);
      //   this.buildchart()
      // }, 10000);
    }
  }

  getSiteData(siteId: number) {

    this.siteService.getSiteById(siteId).subscribe((result) => {
      this.site = result;
      result.sensors.map((x) => {
        this.sensorService.getSensorById(x.id).subscribe((s) => {
          this.sensor = s;
          s.sensorLogs.map((x) => {
            this.logItem = {date: x.date, error: x.error, isDefective: x.isDefective};
            this.logList.push(this.logItem)

          });
        });
        x.pumps.map((p) => {
          this.pumpService.getPumpById(p.id).subscribe((result) => {
            result.pumpLogs.map((l) => {
              this.logItem = {date: l.date, error: l.error, isDefective: l.isDefective}
              this.logList.push(this.logItem)
            })
          })
        });
        x.oldPumps.map((op) => {
          this.oldPumpService.getOldPumpById(op.id).subscribe((result) => {
            result.pumpLogs.map((l) => {
              this.logItem = {date: l.date, error: l.error, isDefective: l.isDefective}
              this.logList.push(this.logItem)
            })
            setTimeout(() => {
              this.logList.forEach((item) => {
                item.date = new Date(item.date);
              });
              this.logList.sort((a, b) => a.date.getTime() - b.date.getTime());
            }, 200)
          })
        });
      });
    });
  }
}
