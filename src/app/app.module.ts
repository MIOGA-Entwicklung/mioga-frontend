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
@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    TreeComponent,
    AutocompleteAutoActiveComponent,

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
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
