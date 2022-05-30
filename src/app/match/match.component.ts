import {Component, OnInit, Output} from '@angular/core';
import {CategoriesService} from "./service";
import {Warrengruppe} from "../models/Warrengruppen";
import {EventEmitterService} from "../event-emitter.service";
import {Category} from "../models/Category";



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

  selectedToMatchCategory : Category



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
    console.log("FROM LEFT Tree")
    this.selectedMiogaCategory = event[0]
    console.log(this.selectedMiogaCategory)
  }

  getEventRightTree(event: any){
    console.log("FROM Right Tree")
    this.selectedToMatchCategory = event[0]
    console.log(this.selectedToMatchCategory)
  }

  match(){
    this.eventEmitterService.onMatchTreeButtonClick();
    this.selectedMiogaCategory.connectionId = this.selectedToMatchCategory.connectionId
    this.categoriesService.updateCategory(this.selectedToMatchCategory).subscribe(data => {
      console.log(data)
    })
  }



}
