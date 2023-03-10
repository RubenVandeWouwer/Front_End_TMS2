import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Site} from '../../models/site';
import {Sensor} from '../../models/sensor';
import {SiteService} from '../../services/site.service';
import * as apex from 'ng-apexcharts';
import {SensorService} from '../../services/sensor.service';
import {DataList} from '../../models/DataList';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {PumpService} from '../../services/pump.service';
import {OldPumpService} from '../../services/old-pump.service';
import {UserService} from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css'],
})
export class SiteDetailComponent implements OnInit {
  site = {} as Site;
  series!: apex.ApexAxisChartSeries;
  chart!: apex.ApexChart;
  title!: apex.ApexTitleSubtitle;
  sensors = [] as Sensor[];
  sensor!: Sensor;
  dataLists = [] as DataList[];
  dataItem!: DataList;
  valueList = [] as number[];
  text!: string;
  dropdownListSensor!: Sensor[];
  dropdownSettingsSensor: IDropdownSettings = {};
  toggleModal!: boolean;
  xaxis!: apex.ApexXAxis;
  intervalId: any;
  isAdmin!: boolean;

  form: any = {
    siteName: null,
    siteAddress: null,
    siteManager: null,
    siteManagerNbr: null,
    siteEmail: null,
    depthSensor: null,
    depthDrainage: null,
  };

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private sensorService: SensorService,
    private pumpService: PumpService,
    private oldPumpService: OldPumpService,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((x) => {
      this.isAdmin = x.isAdmin;
    })
    this.dataLists = [];
    const siteId = this.route.snapshot.paramMap.get('id');
    this.sensorService.getSensors().subscribe((x) => {
      this.dropdownListSensor = x.filter((x) => x.siteId == null);
    });
    this.dropdownSettingsSensor = {
      idField: 'id',
      textField: `name`,
    };
    if (siteId != null) {
      this.getSiteData(+siteId);
      this.intervalId = setInterval(() => {
        this.getSiteData(+siteId);
        this.buildchart()
      }, 20000);
    }
    this.buildchart();
  }

  getSiteData(siteId: number) {
    this.dataLists = [];
    this.siteService.getSiteById(siteId).subscribe((result) => {
      this.site = result;
      result.sensors.map((x) => {
        this.sensorService.getSensorById(x.id).subscribe((s) => {
          this.sensor = s;
          // alle waarden in de valuelist steken
          s.sensorValues?.map((x) => {
            this.valueList.push(x.value);
          });
          //object maken
          this.dataItem = {name: x.name, data: this.valueList};
          //object in de lijst plaatsen
          this.dataLists.push(this.dataItem);
          // valuelist leegmaken voor de volgende iteratie
          this.valueList = [];
        });
      });
      this.title = {text: this.site.name};
      this.dataLists.map((x) => {
        this.series.push(x);
      });
    });
  }

  buildchart() {
    this.chart = {type: 'line'};
    this.xaxis = {labels: {show: false}};
    this.series = this.dataLists;
  }

  onSensorSelect(item: any) {
    this.sensorService.getSensorById(item.id).subscribe((x) => {
      this.sensors.push(x);
    });
  }

  onSensorDeSelect(item: any) {
    this.sensors = this.sensors.filter((x) => x.id != item.id);
  }

  onSelectAllSensors(items: any) {
    items.map((x: Sensor) => {
      this.sensorService.getSensorById(x.id).subscribe((x) => {
        this.sensors.push(x);
      });
    });
  }

  onUnSelectAllSensors() {
    this.sensors = [];
  }

  deleteSensor(sensor: Sensor) {
    if (confirm(`Do you want to delete ${sensor.name}?`)) {
      if (sensor.pumps != []) {
        this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((user) => {
          sensor.pumps.map((x) => {
            x.siteDelete = true;
            x.user = user.name;
            this.pumpService.updatePump(x.id, x).subscribe();
          });
        })

      }
      if (sensor.oldPumps != []) {
        this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((user) => {
          sensor.oldPumps.map((x) => {
            x.siteDelete = true;
            x.user = user.name;
            this.oldPumpService.updateOldPump(x.id, x).subscribe();
          });
        })

      }
      setTimeout(() => {
        sensor.siteDelete = true;
        this.sensorService.updateSensor(sensor.id, sensor).subscribe(() => {
          this.ngOnInit();
        });
      }, 1000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  editSite() {
    this.form.siteName != null ? (this.site.name = this.form.siteName) : null;
    this.form.siteAddress != null
      ? (this.site.address = this.form.siteAddress)
      : null;
    this.form.siteManager != null
      ? (this.site.siteManager = this.form.siteManager)
      : null;
    this.form.siteManagerNbr != null
      ? (this.site.siteManagerNbr = this.form.siteManagerNbr)
      : null;
    this.form.email != null
      ? (this.site.email = this.form.siteEmail)
      : null;
    this.form.depthDrainage != null
      ? (this.site.drainageDepth = this.form.depthDrainage)
      : null;
    this.form.depthSensor != null
      ? (this.site.sensorDepth = this.form.depthSensor)
      : null;
    if (this.sensors != []) {
      this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((user) => {
        this.sensors.map((s) => {
          s.siteId = this.site.id;
          s.siteChange = true;
          s.user = user.name;
          this.sensorService.updateSensor(s.id, s).subscribe();
        });
      })
      this.siteService.updateSite(this.site.id, this.site).subscribe(() => {
        this.ngOnInit();
        this.toggleModal = !this.toggleModal;
      });
    }
  }
}
