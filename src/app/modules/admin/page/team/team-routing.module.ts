import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TeamListComponent} from "./team-list/team-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateUtcPipe} from "../../../../helpers/date.pipe";
import {TeamPageComponent} from "./team-page/team-page.component";
import {TeamListPageComponent} from "./team-list-page/team-list-page.component";

const routes: Routes = [
  {
    path: '',
    component: TeamListPageComponent
  },
  {
    path: ':id',
    component:TeamPageComponent
  }

];

@NgModule({
  declarations: [TeamListComponent, DateUtcPipe],
  imports:
    [
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      MatDialogModule,
      CommonModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
    ],
  exports: [RouterModule, TeamListComponent]
})
export class TeamRoutingModule { }
