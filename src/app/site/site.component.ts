import { Component, Input, OnInit } from '@angular/core';
import { Site } from '../site';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input() site: Site = {id: 0, name: "", address: "", siteManager: "", siteManagerNbr: 0, sensorDepth: "", drainageDepth: ""};

  constructor() { }

  ngOnInit(): void {
  }

}
