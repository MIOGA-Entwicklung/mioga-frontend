import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../match/service";
import {Warrengruppe} from "../models/Warrengruppen";

@Component({
  selector: 'app-warrengruppen',
  templateUrl: './warrengruppen.component.html',
  styleUrls: ['./warrengruppen.component.scss']
})
export class WarrengruppenComponent implements OnInit {

  warrengruppen : Warrengruppe[] = []

  constructor(private categoriesService: CategoriesService ) {
  }


  public getWarrengruppen(): void {

    this.categoriesService.getWarrengruppen().subscribe((receivedData:Warrengruppe[]) => {

      this.warrengruppen = receivedData

    })

  }
  ngOnInit(): void {
    this.getWarrengruppen()
  }

}
