import {NgModule} from '@angular/core';
import {AdminCvListRouterModule} from './admin-cv-list-routing.module';
import { ResumePageComponent } from '../team/resume-page/resume-page.component';
import {CvTemplateModule} from "../../../cv/cv-template/cv-template.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [AdminCvListRouterModule, CvTemplateModule, CommonModule],
	declarations: [
   ResumePageComponent
	]
})

export class AdminCvListModule{}
