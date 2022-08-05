import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PdfFooterModule} from "../pdf-footer/pdf-footer.module";
import {ResumeBuilderEditorComponent} from "./resume-builder-editor.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ResumeBuilderEditorComponent
  ],
  imports: [
    CommonModule,
    PdfFooterModule,
    ReactiveFormsModule

  ],
  exports: [ResumeBuilderEditorComponent]
})
export class ResumeBuilderEditorModule { }
