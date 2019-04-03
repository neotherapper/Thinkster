import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-layout-header',
  templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }
}
