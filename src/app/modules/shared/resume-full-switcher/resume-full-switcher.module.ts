import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ResumeFullSwitcherComponent} from "./resume-full-switcher.component";
import {ResumeTemplateBuilderModule} from "../resume-template-builder/resume-template-builder.module";

@NgModule({
  declarations: [ResumeFullSwitcherComponent],
  imports: [CommonModule,ResumeTemplateBuilderModule],
  exports: [ResumeFullSwitcherComponent],
})
export class ResumeFullSwitcherModule {}
