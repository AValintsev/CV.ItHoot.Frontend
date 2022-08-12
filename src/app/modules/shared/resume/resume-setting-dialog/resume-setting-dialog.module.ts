import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResumeSettingDialog} from "./resume-setting-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {DirectivesModule} from "../../directives/directives.module";
import {TemplatePreviewDialogModule} from "../../template-preview-dialog/template-preview-dialog.module";


@NgModule({
  declarations: [
    ResumeSettingDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    DirectivesModule,
    TemplatePreviewDialogModule
  ],
  exports: [ResumeSettingDialog]
})
export class ResumeSettingDialogModule { }
