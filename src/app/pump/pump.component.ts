import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pump} from '../models/pump';
import {Router} from '@angular/router';
import {OldPump} from "../models/oldPump";

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.css']
})
export class PumpComponent implements OnInit {
  @Input() pump!: Pump;
  @Input() oldPump!: OldPump;
  @Output() onDeletePump: EventEmitter<void> = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  detail(id: number) {
    this.router.navigate(['/pump', id]);
  }

  deletePump() {
    this.onDeletePump.emit();
  }

}
