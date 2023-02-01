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
import {UserData} from "../../models/user";
import {UserService} from "../../shared/services/user-service.service";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  toggleModal!: boolean;
  site = {} as Site;
  sites$!: Observable<Site[]>
  dropdownListSensor!: Sensor[];
  dropdownSettingsSensor: IDropdownSettings = {};
  sensors = [] as Sensor[];
  user!: UserData;
  // admin check
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

  constructor(private siteService: SiteService,
              private sensorService: SensorService,
              private pumpService: PumpService,
              private oldPumpService: OldPumpService,
              // admin check
              private userService: UserService) {
  }

  site$: Observable<Site[]> = new Observable<Site[]>();

  ngOnInit(): void {
    // admin check
    this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((x) => {
      this.isAdmin = x.isAdmin;
    })

    this.sites$ = this.siteService.getSites();
    this.sensorService.getSensors().subscribe((x) => {
        this.dropdownListSensor = x.filter((x) => x.siteId == null)
      }
    )
    this.dropdownSettingsSensor = {
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

  onDeleteSite(site: Site) {

    site.sensors.map((x) => {
      x.pumps.map((x) => {
        x.sensorId = null;
        this.pumpService.updatePump(x.id, x).subscribe();
      })
      x.oldPumps.map((x) => {
        x.sensorId = null;
        this.oldPumpService.updateOldPump(x.id, x).subscribe();
      })
      x.siteId = null;
      this.sensorService.updateSensor(x.id, x).subscribe();
    })

    setTimeout(() => {
      this.siteService.deleteSite(site.id).subscribe(() => {
        this.sites$ = this.siteService.getSites();
      })
    }, 700)
  }

  addSite() {
    this.site.name = this.form.siteName;
    this.site.siteManager = this.form.siteManager;
    this.site.siteManagerNbr = this.form.siteManagerNbr;
    this.site.address = this.form.siteAddress;
    this.site.email = this.form.siteEmail;
    this.site.drainageDepth = this.form.depthDrainage;
    this.site.sensorDepth = this.form.depthSensor;

    this.siteService.createSite(this.site).subscribe((x) => {
      if (this.sensors != []) {
        this.sensors.map((s) => {
          s.siteChange = true;
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
