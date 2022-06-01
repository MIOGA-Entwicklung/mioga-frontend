import {Component, OnInit, Output} from '@angular/core';
import {CategoriesService} from "./service";
import {Warrengruppe} from "../models/Warrengruppen";
import {EventEmitterService} from "../event-emitter.service";
import {Category} from "../models/Category";
import {error} from "@angular/compiler/src/util";



@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Output()
  IncomingWarrengruppenList: Warrengruppe [] = []

  toMatchSelectedList = []

  loadingSymbol = false

  selectedMiogaCategory : Category

  selectedToMatchCategoryList : Category []



  constructor(private categoriesService: CategoriesService , private eventEmitterService: EventEmitterService ) {
  }


  public getCategories(): void {

      this.loadingSymbol = true

      this.categoriesService.getCategories().subscribe((receivedData:Warrengruppe[]) => {

      this.IncomingWarrengruppenList = receivedData

        this.loadingSymbol = false

    })

  }

  ngOnInit(): void {

    this.getCategories()

  }


  getEventLeftTree(event: any){

    console.log("FROM Mioga Tree")

    if(event.length === 0 || !(event.length === 1) ) return

    this.selectedMiogaCategory = event[0]

    console.log(this.selectedMiogaCategory)
  }

  getEventRightTree(event: any){
    console.log("FROM Right Tree")
    this.selectedToMatchCategoryList = event
    console.log(this.selectedToMatchCategoryList)
  }

  match(){
    this.eventEmitterService.onMatchTreeButtonClick();
    this.categoriesService.updateCategory(this.selectedMiogaCategory , this.selectedToMatchCategoryList).subscribe(data => {
      console.log(data)
    })
  }



}
