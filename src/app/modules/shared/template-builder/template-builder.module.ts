import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TemplateBuilderComponent} from "./template-builder.component";


@NgModule({
  declarations: [
    TemplateBuilderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [TemplateBuilderComponent]
})
export class TemplateBuilderModule { }
