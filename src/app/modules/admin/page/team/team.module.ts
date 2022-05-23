import {NgModule} from '@angular/core';
import {TeamRoutingModule} from "./team-routing.module";
import { TeamDialogComponent } from './team-dialog/team-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DateUtcPipe} from "../../../../helpers/date.pipe";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  imports: [TeamRoutingModule, MatFormFieldModule, MatInputModule, MatDialogModule, FormsModule, CommonModule, MatButtonModule, MatOptionModule, MatSelectModule, MatCardModule, MatChipsModule, MatDividerModule, MatIconModule, ReactiveFormsModule, MatAutocompleteModule],
  exports: [
  ],
  declarations: [
    TeamDialogComponent,
  ]
})

export class TeamModule{}
