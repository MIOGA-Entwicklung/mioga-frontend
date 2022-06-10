import {Component, OnInit, TemplateRef} from '@angular/core';
import {CategoriesService} from "../match/service";
import {Warrengruppe} from "../models/Warrengruppen";
import {Zulieferer} from "../models/Zulieferer";
import {NgForm} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-warrengruppen',
  templateUrl: './warrengruppen.component.html',
  styleUrls: ['./warrengruppen.component.scss']
})
export class WarrengruppenComponent implements OnInit {

  warrengruppen: Warrengruppe[] = []

  zulieferList: Zulieferer[]


  selectedId: 0;

  deleteWarengruppen: Warrengruppe;

  closeResult = ``;

  constructor(private categoriesService: CategoriesService, private modalService: NgbModal) {
  }


  public getWarrengruppen(): void {
    this.categoriesService.getWarrengruppen().subscribe((receivedData: Warrengruppe[]) => {
      this.warrengruppen = receivedData
    })

  }

  public getLieferanten(): void {

    this.categoriesService.getZulieferer().subscribe((receivedData: Zulieferer[]) => {
      this.zulieferList = receivedData
    })
  }


  ngOnInit(): void {
    this.getWarrengruppen()
    this.getLieferanten()
  }

  postWarrengruppe(postLieferantForm: NgForm): void {

    let name = postLieferantForm.value.warrengruppeName
    let id = postLieferantForm.value.connectionId

    this.categoriesService.postWarrengruppe(name, id).subscribe((response: void) => {
      console.log(response)
      this.getWarrengruppen()
      alert("neu Warengruppe ist hinzugefügt")
    })

  }

  postDeleteWarengruppen(postDeleteForm: string) {
    this.categoriesService.deleteWarrengruppe(postDeleteForm).subscribe((response: void) => {
      console.log(response)
      this.getWarrengruppen()
    })
  }

  postImportTree(warrentgruppeId: string, connectionId: number) {
    this.categoriesService.importTree(warrentgruppeId, connectionId).subscribe((response: void) => {
      console.log(response)
      this.getWarrengruppen()
    })
  }

  onShowConfirmDelete(deleteWarengruppeModel: any, warrengruppen: any) {
    console.log(warrengruppen)
    this.deleteWarengruppen = warrengruppen
    this.modalService.open(deleteWarengruppeModel, {ariaLabelledBy: 'warengruppeDeleteModelFormHeader'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
