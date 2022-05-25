import {Component, Injectable, Input, OnInit, Output} from '@angular/core';
import {CategoriesService} from "./service";
import {Category} from "../models/Category";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {Warrengruppe} from "../models/Warrengruppen";
import {SelectionModel} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";
import {EventEmitterService} from "../event-emitter.service";

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

  @Output()
  IncomingWarrengruppenList: Warrengruppe [] = []

  loader = false



  miogaSelectedList = []


  toMatchSelectedList = []


  constructor(private categoriesService: CategoriesService , private eventEmitterService: EventEmitterService ) {
  }


  public getCategories(): void {

      this.categoriesService.getCategories().subscribe((receivedData:Warrengruppe[]) => {

      this.IncomingWarrengruppenList = receivedData

        this.loader = true

    })

  }

  ngOnInit(): void {

    this.getCategories()

  }


  getEventLeftTree(event: any){
    console.log("FROM LEFT Tree")
    console.log(event)

  }

  getEventRightTree(event: any){
    console.log("FROM Right Tree")
    console.dir(event)
  }


  match(){
    this.eventEmitterService.onMatchTreeButtonClick();
  }



}
