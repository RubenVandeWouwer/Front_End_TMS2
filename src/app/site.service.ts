import { Injectable } from '@angular/core';
import { Site } from './site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor() { }

  getSites(): Site[] {
    let sites: Site[] = [];

    let site1: Site = {
      id: 1,
      name: "Woonzorgcentrum",
      address: "Kaai 5 Antwerpen",
      siteManager: "Mostmans Frederik",
      siteManagerNbr: 4,
      sensorDepth: "Heel Diep",
      drainageDepth: "Ook heel diep"
    };
    let site2: Site = {
      id: 1,
      name: "Fabriek",
      address: "Gooilaan 65 Brussel",
      siteManager: "Mostmans Frederik",
      siteManagerNbr: 4,
      sensorDepth: "Heel Diep",
      drainageDepth: "Ook heel diep"
    };
    let site3: Site = {
      id: 1,
      name: "Appartementsblok",
      address: "Dorpstraat 8 Geel",
      siteManager: "Mostmans Frederik",
      siteManagerNbr: 4,
      sensorDepth: "Heel Diep",
      drainageDepth: "Ook heel diep"
    };

    sites.push(site1);
    sites.push(site2);
    sites.push(site3);
    return sites;
  }
}
