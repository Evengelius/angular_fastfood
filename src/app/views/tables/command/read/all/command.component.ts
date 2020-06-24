import {Component, OnInit} from '@angular/core';
import {Command} from '../../../../../models/tables/command';
import {CommandService} from '../../../../../services/tables/command.service';

@Component({
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})

export class CommandComponent implements OnInit {

  // Command List
  commands: Command[] = [];
  filteredCommand: Command[];

  // Pagination
  totalRecords: number;
  currentPage = 1;

  // Filtering
  _listFilter: string;

  constructor(private commandService: CommandService) {
  }

  // Getters & Setters
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCommand = this.filteredCommand ? this.performFilter(this.listFilter) : this.commands;
  }

  // Filtering | Method
  performFilter(filterBy: string): Command[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.commands.filter((command: Command) => command.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }



  ngOnInit(): void {
    this.commandService.findAll()
        .subscribe(
            (commands) => {
              this.commands = commands;
              this.filteredCommand = this.commands;
              this.totalRecords = this.filteredCommand.length;
              },
            err => { console.log(err); }
            );
  }
}
