import {NgModule} from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {QuillEditorComponent} from "ngx-quill";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {LanguageDialog} from "./language-dialog.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    LanguageDialog
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    QuillEditorComponent,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    FormsModule,
    CommonModule

  ],
  exports: [LanguageDialog]
})
export class LanguageDialogModule { }
