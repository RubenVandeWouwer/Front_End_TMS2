import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.service';
import { UserData } from '../models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users = [] as UserData[];
  user = {} as UserData;
  email!: string;
  name!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  verifyNewUser() {
    alert('Email is being processed. This can take a minute.');
    console.log('Add User');
    console.log(this.email);
    this.user.email = this.email;
    this.user.isAdmin = false;
    this.user.name = this.name;
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(() => {
      this.ngOnInit();
      this.email = '';
      this.name = '';
    });
  }

  makeAdmin(email: string) {
    console.log('make user admin.');
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

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}
