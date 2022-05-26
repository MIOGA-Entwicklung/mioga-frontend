import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {SelectionModel} from "@angular/cdk/collections";
import {EventEmitterService} from "../event-emitter.service";


interface FlatNode {
  id : string
  name: string;
  expandable: boolean;
  level: number;
  connectionId : number
}


@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {

  loader = true;

  @Input() @Output()
  public categoriesList: Category[]

  @Input()
  public treeName: string =''


  @Output()
  treeSelected = new EventEmitter();



  constructor(private eventEmitterService: EventEmitterService ) {
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FlatNode, Category>();


  /** A selected parent node to be inserted */
  selectedParent: FlatNode | null = null;


  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);


  public getCategories(): void {
    this.flatDataSource.data = this.categoriesList;
  }


  ngOnInit() {
    //Loader variable set false after page load
    setTimeout(() => {
      this.loader = false;
      this.getCategories()
    });

    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeFirstComponentFunction.subscribe(() => {
        this.onSelect();
      });

      this.eventEmitterService.selected = 'left'
    }
    else {

        this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFirstComponentFunction.subscribe(() => {
          this.onSelect();
        });
        this.eventEmitterService.selected = 'right'

    }

  }


  // Flat Tree
  flatTreeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: Category, level: number): FlatNode => {
      return {
        name: node.name,
        expandable: node.children?.length > 0,
        level ,
        id : node.id , connectionId : node.connectionId
      }
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  flatDataSource = new MatTreeFlatDataSource(this.flatTreeControl, this.treeFlattener);


  hasFlatChild(index: number, node: FlatNode) {
    return node.expandable;
  }


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
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
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


  getLevel = (node: FlatNode) => node.level;

  hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.name === '';

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
  onSelect(){
    this.treeSelected.emit(this.checklistSelection.selected)
  }


  showMe(){
    console.log(this.flatDataSource)
  }


}

