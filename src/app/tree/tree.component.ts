import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {SelectionModel} from "@angular/cdk/collections";
import {EventEmitterService} from "../event-emitter.service";
import {Warrengruppe} from "../models/Warrengruppen";


interface FlatNode {
  id: string
  name: string;
  expandable: boolean;
  level: number;
  connectionId: number
}


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {


  @Input() @Output()
  public categoriesList: Category[]

  @Input()
  public warengruppe: Warrengruppe


  @Output()
  treeSelected = new EventEmitter();

  @ViewChild('tree') tree;

  ngAfterViewInit() {
    this.tree.treeControl.collapseAll();
  }


  constructor(private eventEmitterService: EventEmitterService) {
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FlatNode, Category>();


  /** A selected parent node to be inserted */
  selectedParent: FlatNode | null = null;


  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);


  public sortCategories(list) {
    for (let cat of list) {
      if (cat.children.length > 0) {
        cat.children.sort((a, b) => (b['children'] || []).length - (a['children'] || []).length);
        this.sortCategories(cat.children)
      } else list.sort((a, b) => (b['children'] || []).length - (a['children'] || []).length);
    }
  }


  public filterCategories() {

  }

  public getCategories(): void {
    //this.sortCategories(this.categoriesList)
    this.flatDataSource.data = this.categoriesList;
  }


  ngOnInit() {

    this.getCategories()

    this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe(() => {
      this.onSelect();
      this.onUnselectALl()
    });

  }


  /** FLate Tree **/


    //FLat the tree to be used by the controller
  treeFlattener = new MatTreeFlattener(
    (node: Category, level: number): FlatNode => {
      return {
        name: node.name,
        expandable: node.children?.length > 0,
        level: level,
        id: node.id,
        connectionId: node.connectionId
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );


  // Flat Tree Control
  flatTreeControl = new FlatTreeControl<FlatNode>(
    // to extract the current Level:
    node => node.level,
    // to extract the Expandable information
    node => node.expandable
  );

  // Flat the data
  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);


  // Check if the flat node has children
  hasFlatChild(index: number, node: FlatNode) {
    return node.expandable;
  }


  // this will return the tree fata flattened
  getFlattenedData() {
    return this.flatTreeControl.dataNodes
  }

  // return level of given node
  getLevel = (node: FlatNode) => node.level;


  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.flatTreeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.flatTreeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }


  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FlatNode): void {

    //Toggles a value between selected and deselected
    this.checklistSelection.toggle(node);


    // give me all the children and their children for this node
    const descendants = this.flatTreeControl.getDescendants(node);


    this.checklistSelection.isSelected(node) ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode): void {

    this.checkAllParentsSelection(node);
    this.checklistSelection.toggle(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatNode): void {

    // Is the node selected
    const nodeSelected = this.checklistSelection.isSelected(node);

    //Is the node Not Selected
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


  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {

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


  // On Select send the selected data To the Parent Component
  onSelect() {
    this.treeSelected.emit(this.checklistSelection.selected)
  }


  onUnselectALl() {
    this.checklistSelection.deselect(...this.checklistSelection.selected)
  }


}

