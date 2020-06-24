import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {UserService} from '../../services/tables/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;

  clicked: boolean;
  register = 'Register';
  login = 'Login';

  constructor(public userService: UserService, private router: Router) {
    this.clicked = this.clicked !== undefined;
  }

  ngOnInit() {
  }

  signOut() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
