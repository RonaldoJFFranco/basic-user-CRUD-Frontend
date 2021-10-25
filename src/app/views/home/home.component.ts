import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UsersService]
})
export class HomeComponent implements OnInit {

  users!: User[];
  constructor(
    public userService: UsersService
  ) {
    this.userService.getUsers()
      .subscribe((response: User[]) => {
        this.users = response;
      })
  }

  ngOnInit(): void {
  }

}
