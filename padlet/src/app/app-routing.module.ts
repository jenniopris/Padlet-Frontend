import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PadletListComponent} from "./padlet-list/padlet-list.component";
import {PadletDetailsComponent} from "./padlet-details/padlet-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'padlets', pathMatch: 'full'},
  {path: 'padlets', component: PadletListComponent},
  {path: 'padlets/:id', component: PadletDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
