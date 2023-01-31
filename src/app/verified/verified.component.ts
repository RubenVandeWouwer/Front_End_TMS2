import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/services/user";
import {UserService} from "../shared/services/user-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService, private route: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(JSON.parse(localStorage.getItem('user')!).email).subscribe((x) => {
      if (x !== null) {
        this.route.navigate(['sites'])
      }
    })
  }
}
