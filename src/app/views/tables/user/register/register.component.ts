import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/tables/user.service';
import {Validator} from '../../../../validation/validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({

            // Validation
            name: ['', [Validators.required, Validators.minLength(3)]],
            firstname: ['', [Validators.required, Validators.minLength(3)]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {validators: Validator.Matching('password', 'confirmPassword')});
    }

    submit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        } else {
            const payload = {

                // Get the values from the form
                name: this.registerForm.controls.name.value,
                firstname: this.registerForm.controls.firstname.value,
                username: this.registerForm.controls.username.value,
                email: this.registerForm.controls.email.value,
                password: this.registerForm.controls.password.value
            };

            this.userService.register(payload)
                .subscribe(
                    () => {
                        this.router.navigate(['/login']);
                    },
                    (err) => {
                        console.log(err);
                    });
        }
    }
}
