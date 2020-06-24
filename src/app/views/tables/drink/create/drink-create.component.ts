import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DrinkService} from '../../../../services/tables/drink.service';

@Component({
  selector: 'app-drink-create',
  templateUrl: './drink-create.component.html',
  styleUrls: ['./drink-create.component.css']
})
export class DrinkCreateComponent implements OnInit {

  drinkForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private drinkService: DrinkService) {
  }

  ngOnInit(): void {
    this.drinkForm = this.formBuilder.group({

      // Validation
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9][0-9]?(\.[0-9]{1,2})?$/)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      calories: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  add() {
    this.submitted = true;

    if (this.drinkForm.invalid) {
      return;
    } else {
      const payload = {

        // Get the values from the form
        name: this.drinkForm.controls.name.value,
        price: this.drinkForm.controls.price.value,
        description: this.drinkForm.controls.description.value,
        calories: this.drinkForm.controls.calories.value,
        quantity: this.drinkForm.controls.quantity.value
      };

      this.drinkService.create(payload)
          .subscribe(
              () => { this.router.navigate(['/drinks']); },
              (err) => { console.log(err); });
    }
  }
}
