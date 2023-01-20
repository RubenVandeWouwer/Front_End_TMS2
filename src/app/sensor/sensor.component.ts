import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sensor } from '../models/sensor';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  @Input() sensor!: Sensor;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/sensor', id]);
  }

}
