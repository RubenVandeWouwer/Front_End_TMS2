import {Component, OnInit} from '@angular/core';
import {SiteService} from '../../services/site.service';
import {Site} from '../../models/site';
import {Observable} from 'rxjs';
import {IDropdownSettings,} from 'ng-multiselect-dropdown';
import {SensorService} from "../../services/sensor.service";
import {Sensor} from "../../models/sensor";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  toggleModal!: boolean;
  site = {} as Site;
  sites$!: Observable<Site[]>
  dropdownListPump = [];
  dropdownListSensor!: Sensor[];
  dropdownSettingsSensor: IDropdownSettings = {};
  dropdownSettingsPump: IDropdownSettings = {};

  form: any = {
    siteName: null,
    siteAddress: null,
    siteManager: null,
    siteManagerNbr: null,
  };

  constructor(private siteService: SiteService, private sensorService: SensorService) {
  }

  site$: Observable<Site[]> = new Observable<Site[]>();

  ngOnInit(): void {
    this.sites$ = this.siteService.getSites();
    this.sensorService.getSensors().subscribe((x) => {
        this.dropdownListSensor = x.filter((x) => x.siteId == null)
        console.log(x.filter((x) => x.siteId == null))
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

  addSite() {
    this.site.name = this.form.siteName;
    this.site.siteManager = this.form.siteManager;
    this.site.siteManagerNbr = this.form.siteManagerNbr;
    this.site.address = this.form.siteAddress;
    this.site.drainageDepth = 0;
    this.site.sensorDepth = 0;

    this.siteService.createSite(this.site).subscribe(() => {
      this.toggleModal = !this.toggleModal;
      this.form = {};
      this.sites$ = this.siteService.getSites();
    })

  }
}
