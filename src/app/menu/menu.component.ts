import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common'
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private location: Location, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
