import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchComponent } from './match/match.component';
import { TreeComponent } from './tree/tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {ScrollingModule} from "@angular/cdk/scrolling";
import { AutocompleteAutoActiveComponent } from './autocomplete-auto-active/autocomplete-auto-active.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { WarrengruppenComponent } from './warrengruppen/warrengruppen.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { SingleTreeComponent } from './single-tree/single-tree.component';
import {EventEmitterService} from "./event-emitter.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { ZuliefererComponent } from './zulieferer/zulieferer.component';
import { ContactComponent } from './contact/contact.component';
import { ZuliefererContentComponent } from './zulieferer/zulieferer-content/zulieferer-content.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { VarDirective} from './zulieferer/ng-var.directive';
import { ContactsContentComponent } from './contact/contacts-content/contacts-content.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    TreeComponent,
    AutocompleteAutoActiveComponent,
    WarrengruppenComponent,
    SingleTreeComponent,
    ZuliefererComponent,
    ContactComponent,
    ZuliefererContentComponent,
    ErrorComponent,
    HomeComponent,
    VarDirective,
    ContactsContentComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
        MatTreeModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        ScrollingModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSelectModule,

    ],
  providers: [EventEmitterService , {provide: LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
