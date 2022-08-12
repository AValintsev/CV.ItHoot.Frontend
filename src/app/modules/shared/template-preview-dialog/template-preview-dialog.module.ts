import {NgModule} from '@angular/core';
import {TemplatePreviewDialog} from "./template-preview-dialog.component";
import {ResumeTemplateBuilderModule} from "../resume-template-builder/resume-template-builder.module";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [TemplatePreviewDialog],
  imports: [
    CommonModule,
    ResumeTemplateBuilderModule
  ],
  exports: [TemplatePreviewDialog]
})
export class TemplatePreviewDialogModule { }
