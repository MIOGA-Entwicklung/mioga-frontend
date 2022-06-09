import {Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CategoriesService} from "../match/service";
import {Warrengruppe} from "../models/Warrengruppen";
@Component({
  selector: 'app-single-tree',
  templateUrl: './single-tree.component.html',
  styleUrls: ['./single-tree.component.scss']
})
export class SingleTreeComponent implements OnInit {

  @Output()
  injectedCatList: Warrengruppe[] = [];

  warrengruppeId : string = ""

  loadingSymbol = false;

  constructor( private categoriesService : CategoriesService , private route: ActivatedRoute) { }



  public getTree(warrengruppeId : string): void {

    this.loadingSymbol = true

    this.categoriesService.getTree(warrengruppeId).subscribe((receivedData:Warrengruppe[]) => {

      this.injectedCatList = receivedData

      this.loadingSymbol = false
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.warrengruppeId = params['warrengruppeId'];
    });

    this.getTree(this.warrengruppeId)

  }




}
