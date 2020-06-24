import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Drink} from '../../../../../models/tables/drink';
import {DrinkService} from '../../../../../services/tables/drink.service';

@Component({
    selector: 'app-drink-one',
    templateUrl: './drink-one.component.html',
    styleUrls: ['./drink-one.component.css']
})
export class DrinkOneComponent implements OnInit {

    title = 'Drink | Name';
    id: number;
    drink: Drink;

    constructor(private  route: ActivatedRoute, private router: Router, private drinkService: DrinkService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });

        this.drinkService.findOneBy(this.id)
            .subscribe(
                (data) => this.drink = data,
                (err) => {
                    console.log(err);
                }
            );
    }

    delete(): void {
        if (confirm('Do you really want to delete this drink ?')) {
            this.drinkService.destroy(this.drink.id)
                .subscribe({
                    next: () => this.router.navigate(['/drinks']),
                    error: err => console.log(err)
                });
        }
    }
}
