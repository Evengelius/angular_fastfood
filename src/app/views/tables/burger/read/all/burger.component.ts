import { Component, OnInit } from '@angular/core';
import {Burger} from '../../../../../models/tables/burger';
import {BurgerService} from '../../../../../services/tables/burger.service';

@Component({
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.scss']
})
export class BurgerComponent implements OnInit {

  // Burger List
  burgers: Burger[] = [];
  filteredBurger: Burger[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private burgerService: BurgerService) {
  }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBurger = this.filteredBurger ? this.performFilter(this.listFilter) : this.burgers;
  }

  // Filtering | Method
  performFilter(filterBy: string): Burger[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.burgers.filter((burger: Burger) => burger.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.burgerService.findAll()
        .subscribe(
            (burgers) => {
              this.burgers = burgers;
              this.filteredBurger = this.burgers;
              this.totalRecords = this.filteredBurger.length;
            },
            err => { console.log(err); }
        );
  }

}
