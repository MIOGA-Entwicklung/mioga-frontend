import {Component, OnInit, Output} from '@angular/core';
import {CategoriesService} from "../match/service";
import {Category} from "../models/Category";
import {EventEmitterService} from "../event-emitter.service";
import {Warrengruppe} from "../models/Warrengruppen";

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {

  loadingSymbol: any;
  message: any;

  @Output()
  miogaCategoryList: Category[] = [];

  @Output()
  miogaWarrengruppe : Warrengruppe

  selectedMiogaCategory: Category

  selectedToMoveCategoryList: Category []


  constructor(private categoriesService: CategoriesService , private eventEmitterService: EventEmitterService) { }

  public getMiogaCategories():void{
    this.loadingSymbol = true
    this.categoriesService.getMioga().subscribe((receivedData : Category [])=> {
      this.miogaCategoryList = receivedData
      this.loadingSymbol = false
    })
  }

  ngOnInit(): void {
    this.getMiogaCategories()
  }

  moveNode() {
    this.eventEmitterService.onMatchTreeButtonClick();
  }

  getEventLeftTree(event: any) {
    console.log("FROM Left Tree")
    this.selectedMiogaCategory = event[0]
    console.log(this.selectedMiogaCategory)
  }

  getEventRightTree(event: any) {
    console.log("FROM Right Tree")
    this.selectedToMoveCategoryList = event
    console.log(this.selectedToMoveCategoryList)
  }




}
