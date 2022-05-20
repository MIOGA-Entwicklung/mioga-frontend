import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-autocomplete-auto-active',
  templateUrl: './autocomplete-auto-active.component.html',
  styleUrls: ['./autocomplete-auto-active.component.scss']
})
export class AutocompleteAutoActiveComponent implements OnInit {

  @Input()
  categoryList = []

  myControl = new FormControl();

  options: string[] = [];

  filteredOptions: Observable<string[]>;

  ngOnInit() {

    for (let cat of this.categoryList){
       this.options.push(cat.name)
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
