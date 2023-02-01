import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Sensor} from '../models/sensor';
import { UserService } from '../shared/services/user-service.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  @Input() sensor!: Sensor;
  @Input() isAdmin!: boolean;
  @Output() onDeleteSensor: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router,private userService: UserService) {
  }

  ngOnInit(): void {
  }

  detail(id: number) {
    this.router.navigate(['/sensor', id]);
  }

  deleteSensor() {
    this.onDeleteSensor.emit();
  }

}
