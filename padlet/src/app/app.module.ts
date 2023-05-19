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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PadletFormComponent } from './padlet-form/padlet-form.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { LoginComponent } from './login/login.component';
import {PadletApiService} from "./shared/padlet-api.service";
import {AuthenticationService} from "./shared/authentication.service";

@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletDetailsComponent,
    PadletListItemComponent,
    EntryDetailsComponent,
    RatingsComponent,
    CommentsComponent,
    PadletFormComponent,
    EntryFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PadletApiService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
