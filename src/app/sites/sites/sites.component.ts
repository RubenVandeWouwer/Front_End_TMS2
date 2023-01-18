import {Component, OnInit} from '@angular/core';
import {SiteService} from '../../services/site.service';
import {Site} from '../../models/site';
import {Observable} from 'rxjs';
import {IDropdownSettings,} from 'ng-multiselect-dropdown';
import {SensorService} from "../../services/sensor.service";
import {Sensor} from "../../models/sensor";
import {Pump} from "../../models/pump";
import {PumpService} from "../../services/pump.service";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  toggleModal!: boolean;
  site = {} as Site;
  sites$!: Observable<Site[]>
  dropdownListPump!: Pump[];
  dropdownListSensor!: Sensor[];
  dropdownSettingsSensor: IDropdownSettings = {};
  dropdownSettingsPump: IDropdownSettings = {};
  sensors = [] as Sensor[];
  pumps = [] as Pump[];

  form: any = {
    siteName: null,
    siteAddress: null,
    siteManager: null,
    siteManagerNbr: null,
  };

  constructor(private siteService: SiteService, private sensorService: SensorService, private pumpService: PumpService) {
  }

  site$: Observable<Site[]> = new Observable<Site[]>();

  ngOnInit(): void {
    this.sites$ = this.siteService.getSites();
    this.sensorService.getSensors().subscribe((x) => {
        this.dropdownListSensor = x.filter((x) => x.siteId == null)
      }
    )
    this.pumpService.getPumps().subscribe((x) => {
        this.dropdownListPump = x.filter((x) => x.siteId == null)
      }
    )
    this.dropdownSettingsSensor = {
      idField: 'id',
      textField: `name`,
    };
    this.dropdownSettingsPump = {
      idField: 'id',
      textField: `name`,
    };
  }

  onSensorSelect(item: any) {
    this.sensorService.getSensorById(item.id).subscribe((x) => {
      this.sensors.push(x)
    })

  }

  onSensorDeSelect(item: any) {
    this.sensors = this.sensors.filter((x) => x.id != item.id)
  }

  onSelectAllSensors(items: any) {
    items.map((x: Sensor) => {
      this.sensorService.getSensorById(x.id).subscribe((x) => {
        this.sensors.push(x)
      })
    })

  }

  onUnSelectAllSensors() {
    this.sensors = [];
  }


  onPumpSelect(item: any) {
    this.pumpService.getPumpById(item.id).subscribe((x) => {
      this.pumps.push(x)
    })

  }

  onPumpDeSelect(item: any) {
    this.pumps = this.pumps.filter((x) => x.id != item.id)
  }

  onSelectAllPumps(items: any) {
    items.map((x: Sensor) => {
      this.pumpService.getPumpById(x.id).subscribe((x) => {
        this.pumps.push(x)
      })
    })
  }

  onUnSelectAllPumps() {
    this.pumps = [];
  }

  addSite() {
    this.site.name = this.form.siteName;
    this.site.siteManager = this.form.siteManager;
    this.site.siteManagerNbr = this.form.siteManagerNbr;
    this.site.address = this.form.siteAddress;
    this.site.drainageDepth = 0;
    this.site.sensorDepth = 0;

    this.siteService.createSite(this.site).subscribe((x) => {
      if (this.pumps != []) {
        this.pumps.map((p) => {
          p.siteId = x.id;
          this.pumpService.updatePump(p.id, p).subscribe();
        })
      }
      if (this.sensors != []) {
        this.sensors.map((s) => {
          s.siteId = x.id;
          this.sensorService.updateSensor(s.id, s).subscribe();
        })
      }
      this.toggleModal = !this.toggleModal;
      this.form = {};
      this.sites$ = this.siteService.getSites();
    })

  }
}
