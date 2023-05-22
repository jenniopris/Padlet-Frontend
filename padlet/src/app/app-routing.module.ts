import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {EntryDetailsComponent} from "./entry-details/entry-details.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {SharingFormComponent} from "./sharing-form/sharing-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'padlets', pathMatch: 'full'},
  {path: 'padlets', component: PadletListComponent, pathMatch: 'full'},
  {path: 'padlets/new', component: PadletFormComponent, pathMatch: 'full'},
  {path: 'padlets/:padletId/new', component: EntryFormComponent, pathMatch: 'full'},
  {path: 'padlets/:padletId/share', component: SharingFormComponent, pathMatch: 'full'},
  {path: 'padlets/:id', component: PadletDetailsComponent, pathMatch: 'full'},
  {path: 'padlets/:padletId/:entryId', component: EntryDetailsComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, pathMatch: 'full'},
  {path: '**', redirectTo: 'padlets'}, // könnte auch eine 404 Seite sein
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
