import {Component, OnInit, Output} from '@angular/core';
import {CategoriesService} from "./service";
import {Warrengruppe} from "../models/Warrengruppen";
import {EventEmitterService} from "../event-emitter.service";
import {Category} from "../models/Category";
import {ActivatedRoute} from "@angular/router";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {


  @Output()
  miogaObject : Warrengruppe

  @Output()
  objectToMatch : Warrengruppe

  @Output()
  miogaCategoryList: Category [] = []

  @Output()
  categoriesToMatch : Category [] = []


  toMatchSelectedList = []

  loadingSymbol = false

  selectedMiogaCategory: Category

  selectedToMatchCategoryList: Category []

  private wantToMatchShopId: string;

  closeResult = ''

  message: string

  constructor(private categoriesService: CategoriesService, private eventEmitterService: EventEmitterService, private route: ActivatedRoute, private modalService: NgbModal) {
  }


  public getMiogaCategories():void{
    this.loadingSymbol = true
    this.categoriesService.getMioga().subscribe((receivedData : Category [])=> {
      this.miogaCategoryList = receivedData
      this.loadingSymbol = false
    })
  }

  public getCategories(wantToMatchShopId: string): void {

    this.loadingSymbol = true

    this.categoriesService.getCategories(wantToMatchShopId).subscribe((receivedData: Warrengruppe[]) => {

      this.miogaObject = receivedData[0]
      this.miogaCategoryList = receivedData[0].categories

      this.objectToMatch = receivedData[1]
      this.categoriesToMatch = receivedData[1].categories

      this.loadingSymbol = false

    })

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.wantToMatchShopId = params['wantToMatchShopId'];
    });

    this.getCategories(this.wantToMatchShopId)

  }


  getEventLeftTree(event: any) {

    console.log("FROM Mioga Tree")

    if (event.length === 0 || !(event.length === 1)) return

    this.selectedMiogaCategory = event[0]

    console.log(this.selectedMiogaCategory)
  }

  getEventRightTree(event: any) {
    console.log("FROM Right Tree")
    this.selectedToMatchCategoryList = event
    console.log(this.selectedToMatchCategoryList)
  }

  match(confirmUpdateModel: any) {
    this.eventEmitterService.onMatchTreeButtonClick();
    this.categoriesService.updateCategory(this.selectedMiogaCategory, this.selectedToMatchCategoryList).subscribe(data => {
      this.message = data.message
      this.confirmUpdateModel(confirmUpdateModel)
    })

  }

  confirmUpdateModel(confirmUpdateModel) {
    this.modalService.open(confirmUpdateModel, {ariaLabelledBy: 'confirmUpdateModelHeader'}).result.then((result) => {
    }, (reason) => {
      this.closeResult = `Dismissed ${MatchComponent.getDismissReason(reason)}`;
    });
  }


  addCompleteNodeToMioga() {
    this.eventEmitterService.onMatchTreeButtonClick();
    this.categoriesService.postNewNodeToMioga(this.selectedMiogaCategory, this.selectedToMatchCategoryList).subscribe(data => {
      this.getMiogaCategories()
      this.message = data.message
    })
  }

  static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
