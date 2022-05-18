import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";

/*interface CourseNode {
  name: string;
  children?: CourseNode[];
}*/

interface CourseFlatNode {
  name: string;
  expandable: boolean;
  level: number;
}


/*
const TREE_DATA: CourseNode[] = [
  {
    name: 'Angular For Beginners',
    children: [
      {
        name: 'Introduction to Angular'
      },
      {
        name: 'Angular Component @Input()'
      },
      {
        name: 'Angular Component @Output()'
      }
    ],
  },
  {
    name: 'Angular Material In Depth',
    children: [
      {
        name: 'Introduction to Angular Material',
        children: [
          {
            name: 'Form Components'
          },
          {
            name: 'Navigation and Containers'
          }
        ],
      },
      {
        name: 'Advanced Angular Material',
        children: [
          {
            name: 'Custom Themes'
          },
          {
            name: 'Tree Components'
          }
        ],
      },
    ],
  },
];
*/


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {

  @Input()
  public categoriesList: Category[]


  ngOnInit() {

    this.nestedDataSource.data = this.categoriesList;

    this.flatDataSource.data = this.categoriesList;
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
