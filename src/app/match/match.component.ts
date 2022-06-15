import {Component, OnInit, Output} from '@angular/core';
import {CategoriesService} from "./service";
import {Warrengruppe} from "../models/Warrengruppen";
import {EventEmitterService} from "../event-emitter.service";
import {Category} from "../models/Category";
import {ActivatedRoute} from "@angular/router";



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

  private wantToMatchShopId: string;



  constructor(private categoriesService: CategoriesService , private eventEmitterService: EventEmitterService ,private route: ActivatedRoute ) {
  }


  public getCategories(wantToMatchShopId : string): void {

      this.loadingSymbol = true

      this.categoriesService.getCategories(wantToMatchShopId).subscribe((receivedData:Warrengruppe[]) => {

      this.IncomingWarrengruppenList = receivedData

        this.loadingSymbol = false

    })

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.wantToMatchShopId = params['wantToMatchShopId'];
    });

    this.getCategories(this.wantToMatchShopId)

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
