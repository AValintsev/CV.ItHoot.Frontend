import {NgModule} from '@angular/core';
import {TemplateBuilderComponent} from "./template-builder.component";
import {CommonModule} from "@angular/common";
import {PdfFooterModule} from "../pdf-footer/pdf-footer.module";


@NgModule({
  declarations: [
    TemplateBuilderComponent
  ],
    imports: [
        CommonModule,
        PdfFooterModule

    ],
  exports: [TemplateBuilderComponent]
})
export class TemplateBuilderModule { }
