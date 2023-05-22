import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PadletListComponent} from './padlet-list/padlet-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PadletDetailsComponent} from './padlet-details/padlet-details.component';
import {PadletListItemComponent} from './padlet-list-item/padlet-list-item.component';
import {EntryDetailsComponent} from './entry-details/entry-details.component';
import {RatingsComponent} from './ratings/ratings.component';
import {CommentsComponent} from './comments/comments.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PadletFormComponent} from './padlet-form/padlet-form.component';
import {EntryFormComponent} from './entry-form/entry-form.component';
import {LoginComponent} from './login/login.component';
import {PadletApiService} from "./shared/padlet-api.service";
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AdminComponent } from './admin/admin.component';
import { SharingFormComponent } from './sharing-form/sharing-form.component';
import { ProfileComponent } from './profile/profile.component';

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
    AdminComponent,
    SharingFormComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    PadletApiService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
