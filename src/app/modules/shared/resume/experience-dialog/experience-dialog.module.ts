import {NgModule} from '@angular/core';
import {ExperienceDialog} from "./experience-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {QuillEditorComponent} from "ngx-quill";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ExperienceDialog
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    QuillEditorComponent,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule

  ],
  exports: [ExperienceDialog]
})
export class ExperienceDialogModule { }
