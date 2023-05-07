import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import {HttpClientModule} from "@angular/common/http";
import { PadletDetailsComponent } from './padlet-details/padlet-details.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { EntryListItemComponent } from './entry-list-item/entry-list-item.component';
@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletDetailsComponent,
    PadletListItemComponent,
    EntryDetailsComponent,
    EntryListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
