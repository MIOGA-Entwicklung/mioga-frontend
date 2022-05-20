import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
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
//              "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    TreeComponent
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
