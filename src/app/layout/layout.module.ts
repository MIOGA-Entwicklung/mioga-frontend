import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import {RouterModule} from "@angular/router";
import {MatchComponent} from "../match/match.component";
import {WarrengruppenComponent} from "../warrengruppen/warrengruppen.component";
import {SingleTreeComponent} from "../single-tree/single-tree.component";
import {ZuliefererComponent} from "../zulieferer/zulieferer.component";
import {ContactComponent} from "../contact/contact.component";
import {ErrorComponent} from "../error/error.component";
import {HomeComponent} from "../home/home.component";


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    BodyComponent
  ],
  imports: [
    CommonModule , RouterModule.forRoot([
      {path:"match", component:MatchComponent},
      {path:"warrengruppe" , component:WarrengruppenComponent},
      {path:"single-tree/:warrengruppeId" , component:SingleTreeComponent , pathMatch: 'full' },
      {path:"", component:HomeComponent},
      {path:"home" , component:HomeComponent},
      {path: 'zulieferer', component: ZuliefererComponent},
      {path: 'contact', component:ContactComponent},
      {path: "**" , component:ErrorComponent}
    ])
  ]
  ,
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    BodyComponent
  ]
})
export class LayoutModule {
}
