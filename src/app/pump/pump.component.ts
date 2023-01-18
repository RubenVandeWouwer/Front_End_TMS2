import { Component, Input, OnInit } from '@angular/core';
import { Pump } from '../models/pump';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.css']
})
export class PumpComponent implements OnInit {
  @Input() pump!: Pump;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  detail(id: number) {
    this.router.navigate(['/pump', id]);
  }

}
