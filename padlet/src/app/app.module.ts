import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PadletListComponent} from './padlet-list/padlet-list.component';
import {HttpClientModule} from "@angular/common/http";
import {PadletDetailsComponent} from './padlet-details/padlet-details.component';
import {PadletListItemComponent} from './padlet-list-item/padlet-list-item.component';
import {EntryDetailsComponent} from './entry-details/entry-details.component';
import { RatingsComponent } from './ratings/ratings.component';
import { CommentsComponent } from './comments/comments.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletDetailsComponent,
    PadletListItemComponent,
    EntryDetailsComponent,
    RatingsComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
