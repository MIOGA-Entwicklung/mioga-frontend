import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../match/service";
import {Warrengruppe} from "../models/Warrengruppen";
import {Zulieferer} from "../models/Zulieferer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-warrengruppen',
  templateUrl: './warrengruppen.component.html',
  styleUrls: ['./warrengruppen.component.scss']
})
export class WarrengruppenComponent implements OnInit {

  warrengruppen: Warrengruppe[] = []

  zulieferList: Zulieferer[]


  selectedId: 0;

  constructor(private categoriesService: CategoriesService) {
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

    this.categoriesService.postWarrengruppe(name, id).subscribe((response : void)  => {
      console.log(response)
      this.getWarrengruppen()
    })

  }

    postDelete(postDeleteForm: string) {
      this.categoriesService.deleteWarrengruppe(postDeleteForm).subscribe((response : void)=> {
          console.log(response)
          this.getWarrengruppen()
        })
    }

  postImportTree(warrentgruppeId : string , connectionId : number) {
    this.categoriesService.importTree(warrentgruppeId , connectionId).subscribe((response : void)=> {
      console.log(response)
      this.getWarrengruppen()
    })
  }
}
