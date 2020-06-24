import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Burger} from '../../../../../models/tables/burger';
import {BurgerService} from '../../../../../services/tables/burger.service';

@Component({
  selector: 'app-burger-one',
  templateUrl: './burger-one.component.html',
  styleUrls: ['./burger-one.component.css']
})
export class BurgerOneComponent implements OnInit {

  title = 'Burger | Name';
  id: number;
  burger: Burger;

  constructor(private  route: ActivatedRoute, private router: Router, private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.burgerService.findOneBy(this.id)
        .subscribe(
            (data) => this.burger = data ,
            (err) => { console.log(err); }
        );
  }

  delete(): void {
    if (confirm('Do you really want to delete this burger ?')) {
      this.burgerService.destroy(this.burger.id)
          .subscribe({
            next: () => this.router.navigate(['/burgers']),
            error: err => console.log(err)
          });
    }
  }

}
