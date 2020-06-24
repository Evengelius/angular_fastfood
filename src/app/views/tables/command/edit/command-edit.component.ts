import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommandService} from '../../../../services/tables/command.service';
import {Validator} from '../../../../validation/validator';

@Component({
    templateUrl: './command-edit.component.html',
    styleUrls: ['./command-edit.component.css']
})
export class CommandEditComponent implements OnInit {

    commandForm: FormGroup;
    id: number;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private commandService: CommandService
    ) {
    }

    ngOnInit(): void {

        this.commandRequest(this.route.snapshot.params.id);
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
            email: ['', [Validators.required, Validators.email]],
            address: ['', Validators.required],
            postalCode: ['', [Validators.required, Validator.Regex(/^[0-9]+$/, 'onlyDigit')]],
            street: ['', [Validators.required,  Validator.Regex(/^[a-zA-Z\s]*$/i, 'onlyLetters')]]
        });
    }

    commandRequest(id: any) {
        this.commandService.findOneBy(id)
            .subscribe(
                (data) => {
                    this.id = data.id;
                    this.commandForm.setValue(
                        {
                            lastName: data.lastName,
                            firstName: data.firstName,
                            login: data.login,
                            email: data.email,
                            address: data.address,
                            postalCode: data.postalCode,
                            street: data.street
                        }
                    );
                    console.log(data);
                });
    }

    update(form: NgForm) {
        this.commandService.update(this.id, form)
            .subscribe(
                () => {
                    this.router.navigate(['/commands']);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
