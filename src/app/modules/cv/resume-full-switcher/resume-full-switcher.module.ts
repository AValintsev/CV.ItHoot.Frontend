import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ResumeFullSwitcherComponent} from "./resume-full-switcher.component";
import {TemplateBuilderModule} from "../../shared/template-builder/template-builder.module";
@NgModule({
  declarations: [ResumeFullSwitcherComponent],
  imports: [CommonModule,TemplateBuilderModule],
  exports: [ResumeFullSwitcherComponent],
})
export class ResumeFullSwitcherModule {}
