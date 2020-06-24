import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommandService} from '../../../../services/tables/command.service';

import {Validator} from '../../../../validation/validator';

@Component({
    templateUrl: './command-create.component.html',
    styleUrls: ['./command-create.component.scss']
})
export class CommandCreateComponent implements OnInit {

    commandForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private commandService: CommandService) {
    }

    ngOnInit(): void {
        this.commandForm = this.formBuilder.group({

            // Validation
            lastName:
                ['',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters'),
                        Validator.Regex(/^\S*$/, 'noWhiteSpace')
                    ]
                ],
            firstName:
                ['',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters'),
                        Validator.Regex(/^\S*$/, 'noWhiteSpace')
                    ]
                ],
            login:
                ['',
                    [
                        Validators.required,
                        Validators.minLength(5),
                        Validators.maxLength(10),
                        Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters'),
                        Validator.Regex(/^\S*$/, 'noWhiteSpace')
                    ]
                ],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: ['', Validators.required],
            postalCode: ['', [Validators.required, Validator.Regex(/^[0-9]+$/, 'onlyDigit')]],
            street: ['', [Validators.required,  Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters')]]
        }, {validators: Validator.Matching('password', 'confirmPassword')});
    }

    add() {
        this.submitted = true;

        if (this.commandForm.invalid) {
            return;
        } else {
            const payload = {

                // Get the values from the form
                lastName: this.commandForm.controls.lastName.value,
                firstName: this.commandForm.controls.firstName.value,
                login: this.commandForm.controls.login.value,
                password: this.commandForm.controls.password.value,
                email: this.commandForm.controls.email.value,
                address: this.commandForm.controls.address.value,
                postalCode: this.commandForm.controls.postalCode.value,
                street: this.commandForm.controls.street.value
            };

            this.commandService.create(payload)
                .subscribe(
                    () => { this.router.navigate(['/commands']); },
                    (err) => { console.log(err); });
        }
    }
}
