import {Component, Input, OnInit} from '@angular/core';
import {Tree} from "./tree";
import {Category} from "./warrengruppe";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input()
  public treeList: Category[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
