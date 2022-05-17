import {Component, OnInit} from '@angular/core';
import {Tree} from "../tree/tree";
import {Category} from "../tree/warrengruppe";
import {CategoriesService} from "./service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  IncomingCategoriesList: Category [] = []

  constructor(private categoriesService: CategoriesService) {
  }


  public getCategories(): void {
    this.categoriesService.getCategories().subscribe((receivedData) => (
      this.IncomingCategoriesList = receivedData));

    console.log(this.IncomingCategoriesList)

  }

  ngOnInit(): void {
    this.getCategories()
  }

}
