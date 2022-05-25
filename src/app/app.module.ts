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
@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    TreeComponent,
    AutocompleteAutoActiveComponent,
    WarrengruppenComponent,
    SingleTreeComponent,

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
    MatProgressSpinnerModule

  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
