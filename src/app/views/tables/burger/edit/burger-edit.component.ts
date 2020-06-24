import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BurgerService} from '../../../../services/tables/burger.service';

@Component({
  templateUrl: './burger-edit.component.html',
  styleUrls: ['./burger-edit.component.scss']
})
export class BurgerEditComponent implements OnInit {

  burgerForm: FormGroup;
  id: number;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private burgerService: BurgerService
  ) {
  }

  ngOnInit(): void {

    this.burgerRequest(this.route.snapshot.params.id);
    this.burgerForm = this.formBuilder.group({

      // Validation
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9][0-9]?(\.[0-9]{1,2})?$/)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
        recipe: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  burgerRequest(id: any) {
    this.burgerService.findOneBy(id)
        .subscribe(
            (data) => {
              this.id = data.id;
              this.burgerForm.setValue(
                  {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                      recipe: data.recipe,
                    quantity: data.quantity
                  }
              );
              console.log(data);
            });
  }

  update(form: NgForm) {
    this.burgerService.update(this.id, form)
        .subscribe(
            () => {
              this.router.navigate(['/burgers']);
            },
            (err) => {
              console.log(err);
            }
        );
  }
}
