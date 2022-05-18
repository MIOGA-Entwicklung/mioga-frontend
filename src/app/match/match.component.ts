import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "./service";
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}

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

    this.categoriesService.getCategories().subscribe((receivedData) => {

      this.IncomingCategoriesList = receivedData

      this.nestedDataSource.data = this.IncomingCategoriesList;

      this.flatDataSource.data = this.IncomingCategoriesList;

    })

  }

  ngOnInit(): void {

    this.getCategories()

  }

  // Nested Tree
  nestedDataSource = new MatTreeNestedDataSource<Category>();

  nestedTreeControl = new NestedTreeControl<Category>(node => node.children);

  // Flat Tree
  flatTreeControl = new FlatTreeControl<CourseFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: Category, level: number): CourseFlatNode => {
      return {
        name: node.name,
        expandable: node.children?.length > 0,
        level
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);


  hasNestedChild(index: number, node: Category) {
    return node?.children?.length > 0;
  }

  hasFlatChild(index: number, node: CourseFlatNode) {
    return node.expandable;
  }

}
