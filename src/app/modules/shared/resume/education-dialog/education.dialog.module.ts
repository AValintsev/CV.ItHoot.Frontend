import {NgModule} from '@angular/core';
import {EducationDialog} from "./education-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {QuillEditorComponent} from "ngx-quill";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    EducationDialog
  ],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    QuillEditorComponent,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [EducationDialog]
})
export class EducationDialogModule { }
