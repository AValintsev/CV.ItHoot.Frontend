import {NgModule} from '@angular/core';
import {SkillDialog} from "./skill-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    SkillDialog
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [SkillDialog]
})
export class SkillDialogModule { }
