import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  matches = [];

  @Output()
  selectedName: EventEmitter<string> = new EventEmitter();

  searchKeyup(ev) {

    /** ev.target : The element whose autofill state changes **/

    let term: any = ev.target;
    this.matches = [];

    // If what the User Entered is more than zero letters
    if(term.value.length > 0){
      //Filter the input with the list
      this.filter(this.categoryList, term.value);
    }

  }
  filter(categoriesList, term) {
    categoriesList.forEach((cat) => {
      if (cat.name.toLowerCase().includes(term.toLowerCase())) {
        this.matches.push(cat);
      }
      if (cat.level < 5 && cat.children.length > 0) {
        this.filter(cat.children, term);
      }
    });
  }


  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(() => this.matches.map(match => match.name)),
    );

  }

  getSelected(value: string) {
    console.log(value)
    this.selectedName.emit(value)
  }

}
