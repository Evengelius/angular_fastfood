import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/tables/user.service';
import {Login} from '../../../../models/auth/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: Login;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      // Validation
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required]
    });

    this.user = {
      username: '',
      password: ''
    };
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      const payload = {

        // Get the values from the form
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
      };

      // Set the values from the form into the model
      this.user.username = payload.username;
      this.user.password = payload.password;


      // Persist the data
      this.userService.login(this.user)
          .subscribe(
              () => { this.router.navigate(['/commands']); },
              (err) => { console.log(err); });
    }
  }

}
