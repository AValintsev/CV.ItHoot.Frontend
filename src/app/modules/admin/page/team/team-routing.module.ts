import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TeamPageComponent} from "./team-page/team-page.component";
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

const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent
  }

];

@NgModule({
  declarations: [TeamPageComponent, DateUtcPipe],
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
  exports: [RouterModule]
})
export class TeamRoutingModule { }
