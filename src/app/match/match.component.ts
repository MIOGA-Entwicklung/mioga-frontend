import {Component, OnInit, Output} from '@angular/core';
import {CategoriesService} from "./service";
import {Warrengruppe} from "../models/Warrengruppen";
import {EventEmitterService} from "../event-emitter.service";



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
