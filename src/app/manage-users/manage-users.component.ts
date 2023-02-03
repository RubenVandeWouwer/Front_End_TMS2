import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user-service.service';
import {UserData} from '../models/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users = [] as UserData[];
  user = {} as UserData;

  form: any = {
    email: null,
    name: null,
  };


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  verifyNewUser() {
    this.user.email = this.form.email;
    this.user.isAdmin = false;
    this.user.name = this.form.name;
    console.log(this.user)
    this.userService.createUser(this.user).subscribe(() => {
      this.ngOnInit();
      this.form = {};
    });
  }

  makeAdmin(email: string) {
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

  deleteUser(user: UserData) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
