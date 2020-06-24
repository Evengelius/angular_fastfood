import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/tables/user.service';
import {Validator} from '../../../../validation/validator';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

    userForm: FormGroup;
    id: number;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {

        this.userRequest(this.route.snapshot.params.id);
        this.userForm = this.formBuilder.group({

            // Validation
            name: ['', [Validators.required, Validators.minLength(3)]],
            firstname: ['', [Validators.required, Validators.minLength(3)]],
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {validators: Validator.Matching('password', 'confirmPassword')});
    }

    userRequest(id: any) {
        this.userService.findOneBy(id)
            .subscribe(
                (data) => {
                    this.id = data.id;
                    this.userForm.setValue(
                        {
                            name: data.name,
                            firstname: data.firstname,
                            username: data.username,
                            email: data.email,
                            password: data.password,
                            confirmPassword: data.password
                        }
                    );
                    console.log(data);
                });
    }

    update(form: NgForm) {
        this.userService.update(this.id, form)
            .subscribe(
                () => {
                    if (this.userForm.get('password')?.dirty && this.userForm.get('confirmPassword')?.dirty) {
                        this.userService.logout();
                        this.router.navigateByUrl('/login');
                    } else {
                        this.router.navigate(['/users']);
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
