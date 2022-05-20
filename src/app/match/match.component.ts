import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "./service";
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {Warrengruppe} from "../models/Warrengruppen";

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

  IncomingWarrengruppenList: Warrengruppe [] = []

  constructor(private categoriesService: CategoriesService) {
  }


  public getCategories(): void {

      this.categoriesService.getCategories().subscribe((receivedData:Warrengruppe[]) => {

      this.IncomingWarrengruppenList = receivedData

      this.nestedDataSource.data = this.IncomingWarrengruppenList[0].categories;

      this.flatDataSource.data = this.IncomingWarrengruppenList[1].categories;

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
