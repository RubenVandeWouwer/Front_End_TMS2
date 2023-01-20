import {Component, OnInit} from '@angular/core';
import {SiteService} from '../../services/site.service';
import {Site} from '../../models/site';
import {Observable} from 'rxjs';
import {IDropdownSettings,} from 'ng-multiselect-dropdown';
import {SensorService} from "../../services/sensor.service";
import {Sensor} from "../../models/sensor";
import {Pump} from "../../models/pump";
import {PumpService} from "../../services/pump.service";
import {OldPumpService} from "../../services/old-pump.service";
import {OldPump} from "../../models/oldPump";

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
  dropdownListOldPump!: OldPump[];
  dropdownListSensor!: Sensor[];
  dropdownSettingsSensor: IDropdownSettings = {};
  dropdownSettingsPump: IDropdownSettings = {};
  dropdownSettingsOldPump: IDropdownSettings = {};
  sensors = [] as Sensor[];
  pumps = [] as Pump[];
  oldPumps = [] as OldPump[];

  form: any = {
    siteName: null,
    siteAddress: null,
    siteManager: null,
    siteManagerNbr: null,
  };

  constructor(private siteService: SiteService, private sensorService: SensorService, private pumpService: PumpService, private oldPumpService: OldPumpService) {
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
    this.oldPumpService.getOldPumps().subscribe((x) => {
        this.dropdownListOldPump = x.filter((x) => x.siteId == null)
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
    this.dropdownSettingsOldPump = {
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
      this.oldPumps.push(x)
    })

  }

  onPumpDeSelect(item: any) {
    this.oldPumps = this.oldPumps.filter((x) => x.id != item.id)
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

  onSelectAllOldPumps(items: any) {
    items.map((x: Sensor) => {
      this.oldPumpService.getOldPumpById(x.id).subscribe((x) => {
        this.oldPumps.push(x)
      })
    })
  }

  onUnSelectAllOldPumps() {
    this.oldPumps = [];
  }

  onOldPumpSelect(item: any) {
    this.oldPumpService.getOldPumpById(item.id).subscribe((x) => {
      this.oldPumps.push(x)
    })

  }

  onOldPumpDeSelect(item: any) {
    this.oldPumps = this.oldPumps.filter((x) => x.id != item.id)
  }

  onDeleteSite(site: Site) {
    if (site.sensors != []) {
      console.log(1)
      site.sensors.map((x) => {
        x.siteId = null;
        this.sensorService.updateSensor(x.id, x).subscribe();
        console.log(1)
      })
    }
    if (site.pumps != []) {
      console.log(2)
      site.pumps.map((x) => {
        x.siteId = null;
        console.log(x.siteId)
        this.pumpService.updatePump(x.id, x).subscribe();
        console.log(2)
      })
    }
    if (site.oldPumps != []) {
      console.log(3)
      site.oldPumps.map((x) => {
        x.siteId = null;
        this.oldPumpService.updateOldPump(x.id, x).subscribe();
        console.log(3)
      })
    }
    this.siteService.deleteSite(site.id).subscribe(() => {
      this.sites$ = this.siteService.getSites();
    })
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
      if (this.oldPumps != []) {
        this.oldPumps.map((p) => {
          p.siteId = x.id;
          this.oldPumpService.updateOldPump(p.id, p).subscribe();
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
