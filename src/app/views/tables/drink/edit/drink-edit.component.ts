import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DrinkService} from '../../../../services/tables/drink.service';

@Component({
  templateUrl: './drink-edit.component.html',
  styleUrls: ['./drink-edit.component.css']
})
export class DrinkEditComponent implements OnInit {

  drinkForm: FormGroup;
  id: number;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private drinkService: DrinkService
  ) {
  }

  ngOnInit(): void {

    this.drinkRequest(this.route.snapshot.params.id);
    this.drinkForm = this.formBuilder.group({

      // Validation
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9][0-9]?(\.[0-9]{1,2})?$/)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      calories: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  drinkRequest(id: any) {
    this.drinkService.findOneBy(id)
        .subscribe(
            (data) => {
              this.id = data.id;
              this.drinkForm.setValue(
                  {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    calories: data.calories,
                    quantity: data.quantity
                  }
              );
              console.log(data);
            });
  }

  update(form: NgForm) {
    this.drinkService.update(this.id, form)
        .subscribe(
            () => {
              this.router.navigate(['/drinks']);
            },
            (err) => {
              console.log(err);
            }
        );
  }
}
