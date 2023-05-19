import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";
import {EntryDetailsComponent} from "./entry-details/entry-details.component";
import {PadletFormComponent} from "./padlet-form/padlet-form.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";

const routes: Routes = [
  {path: '', redirectTo: 'padlets', pathMatch: 'full'},
  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/new', component: PadletFormComponent},
  {path: 'padlets/:padletId/new', component: EntryFormComponent},
  {path: 'padlets/:id', component: PadletDetailsComponent},
  {path: 'padlets/:padletId/:entryId', component: EntryDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
