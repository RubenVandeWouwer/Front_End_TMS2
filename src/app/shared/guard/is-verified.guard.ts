import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user-service.service";
import {UserData} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class IsVerifiedGuard implements CanActivate {
  user!: UserData;

  constructor(
    public authService: AuthService,
    public route: Router,
    public userService: UserService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.getUserForGuard(JSON.parse(localStorage.getItem('user')!).email).subscribe((x) => {
      if (x === null) {
        this.route.navigate(['verified'])
      }
    })
    return true;
  }
}
