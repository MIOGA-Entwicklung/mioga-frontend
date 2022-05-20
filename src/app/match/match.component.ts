import {Component, Injectable, OnInit} from '@angular/core';
import {CategoriesService} from "./service";
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {Warrengruppe} from "../models/Warrengruppen";
import {SelectionModel} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";

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

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CourseFlatNode, Category>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Category, CourseFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: CourseFlatNode | null = null;


  /** The selection for checklist */
  checklistSelection = new SelectionModel<CourseFlatNode>(true /* multiple */);

  constructor(private categoriesService: CategoriesService ) {
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





  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: CourseFlatNode): boolean {
    const descendants = this.flatTreeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: CourseFlatNode): boolean {
    const descendants = this.flatTreeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: CourseFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.flatTreeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: CourseFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: CourseFlatNode): void {
    let parent: CourseFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: CourseFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.flatTreeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }


  getLevel = (node: CourseFlatNode) => node.level;

  hasNoContent = (_: number, _nodeData: CourseFlatNode) => _nodeData.name === '';



  /* Get the parent node of a node */
  getParentNode(node: CourseFlatNode): CourseFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.flatTreeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.flatTreeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }


}
