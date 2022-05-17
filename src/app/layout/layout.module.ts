import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import {RouterModule} from "@angular/router";
import {MatchComponent} from "../match/match.component";


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
