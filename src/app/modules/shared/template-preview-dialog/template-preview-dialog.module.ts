import {NgModule} from '@angular/core';
import {TemplatePreviewDialog} from "./template-preview-dialog.component";
import {ResumeTemplateBuilderModule} from "../resume-template-builder/resume-template-builder.module";


@NgModule({
  declarations: [TemplatePreviewDialog],
  imports: [
    ResumeTemplateBuilderModule
  ],
  exports: [TemplatePreviewDialog]
})
export class TemplatePreviewDialogModule { }
