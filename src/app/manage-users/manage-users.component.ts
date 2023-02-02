import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.service';
import { UserData } from '../models/user'

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users= [] as UserData[];
  user!: UserData;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  verifyUser(email: string){
    console.log("make user verified.")
    this.userService.getUserByEmail(email).subscribe((result) => {
      this.user = result;
      this.user.isVerified = true;
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  makeAdmin(email: string){
    console.log("make user admin.")
    this.userService.getUserByEmail(email).subscribe((result) => {
      this.user = result;
      this.user.isAdmin = true;
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  undoAdmin(email: string) {
    this.userService.getUserByEmail(email).subscribe((result) => {
      this.user = result;
      this.user.isAdmin = false;
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  unVerify(email: string){
    this.userService.getUserByEmail(email).subscribe((result) => {
      this.user = result;
      this.user.isVerified = false;
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.ngOnInit();
      });
    });
  }

}
