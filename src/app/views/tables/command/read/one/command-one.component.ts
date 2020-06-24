import { Component, OnInit } from '@angular/core';
import {Command} from '../../../../../models/tables/command';
import {ActivatedRoute, Router} from '@angular/router';
import {CommandService} from '../../../../../services/tables/command.service';

@Component({
  selector: 'app-command-one',
  templateUrl: './command-one.component.html',
  styleUrls: ['./command-one.component.css']
})
export class CommandOneComponent implements OnInit {

  title = 'Command | Author';
  id: number;
  command: Command;

  constructor(private  route: ActivatedRoute, private router: Router, private commandService: CommandService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.commandService.findOneBy(this.id)
        .subscribe(
            (data) => this.command = data ,
            (err) => { console.log(err); }
        );
  }

  delete(): void {
    if (confirm('Do you really want to delete this command ?')) {
      this.commandService.destroy(this.command.id)
          .subscribe({
            next: () => this.router.navigate(['/commands']),
            error: err => console.log(err)
          });
    }
  }

}
