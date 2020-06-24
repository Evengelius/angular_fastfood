import { Component, OnInit } from '@angular/core';
import {Drink} from '../../../../../models/tables/drink';
import {DrinkService} from '../../../../../services/tables/drink.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {

  // Drink List
  drinks: Drink[] = [];
  filteredDrink: Drink[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private drinkService: DrinkService) {
  }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredDrink = this.filteredDrink ? this.performFilter(this.listFilter) : this.drinks;
  }

  // Filtering | Method
  performFilter(filterBy: string): Drink[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.drinks.filter((drink: Drink) => drink.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.drinkService.findAll()
        .subscribe(
            (drinks) => {
              this.drinks = drinks;
              this.filteredDrink = this.drinks;
              this.totalRecords = this.filteredDrink.length;
            },
            err => { console.log(err); }
        );
  }
}
