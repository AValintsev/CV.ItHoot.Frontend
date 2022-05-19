import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {TeamPageComponent} from "./team-page/team-page.component";
import {SkillPageComponent} from "../skill/skill-page/skill-page.component";
import {SkillDialogComponent} from "../skill/skill-dialog/skill-dialog.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {MaterialModule} from "../../../material/material.module";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent
  }

];

@NgModule({
  declarations: [TeamPageComponent],
  imports:
    [
      MatTableModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      MatDialogModule,
      MaterialModule,
      CommonModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
