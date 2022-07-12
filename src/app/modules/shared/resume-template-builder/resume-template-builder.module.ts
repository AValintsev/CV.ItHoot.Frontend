import {NgModule} from '@angular/core';
import {ResumeTemplateBuilderComponent} from "./resume-template-builder.component";
import {CommonModule} from "@angular/common";
import {PdfFooterModule} from "../pdf-footer/pdf-footer.module";


@NgModule({
  declarations: [
    ResumeTemplateBuilderComponent
  ],
    imports: [
        CommonModule,
        PdfFooterModule

    ],
  exports: [ResumeTemplateBuilderComponent]
})
export class ResumeTemplateBuilderModule { }
