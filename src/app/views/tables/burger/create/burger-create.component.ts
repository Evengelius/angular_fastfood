import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BurgerService} from '../../../../services/tables/burger.service';

@Component({
  selector: 'app-burger-create',
  templateUrl: './burger-create.component.html',
  styleUrls: ['./burger-create.component.scss']
})
export class BurgerCreateComponent implements OnInit {

  burgerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private burgerService: BurgerService) {
  }

  ngOnInit(): void {
    this.burgerForm = this.formBuilder.group({

      // Validation
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.pattern(/^[0-9][0-9]?(\.[0-9]{1,2})?$/)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      recipe: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  add() {
    this.submitted = true;

    if (this.burgerForm.invalid) {
      return;
    } else {
      const payload = {

        // Get the values from the form
        name: this.burgerForm.controls.name.value,
        price: this.burgerForm.controls.price.value,
        description: this.burgerForm.controls.description.value,
        recipe: this.burgerForm.controls.recipe.value,
        quantity: this.burgerForm.controls.quantity.value
      };

      this.burgerService.create(payload)
          .subscribe(
              () => { this.router.navigate(['/burgers']); },
              (err) => { console.log(err); });
    }
  }
}
