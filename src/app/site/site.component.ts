import { Component, Input, OnInit } from '@angular/core';
import { Site } from '../models/site';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @Input() site!: Site;

  constructor() { }

  ngOnInit(): void {
  }

}
