import {Component, OnInit, Output} from '@angular/core';
import {Category} from "../models/Category";
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

  loader = false

  constructor( private categoriesService : CategoriesService , private route: ActivatedRoute) { }



  public getTree(warrengruppeId : string): void {

    this.categoriesService.getTree(warrengruppeId).subscribe((receivedData:Warrengruppe[]) => {

      this.injectedCatList = receivedData

      this.loader = true
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.warrengruppeId = params['warrengruppeId'];
    });

    this.getTree(this.warrengruppeId)

  }




}
