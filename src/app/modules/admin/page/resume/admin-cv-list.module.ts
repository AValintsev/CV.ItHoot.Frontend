import {NgModule} from '@angular/core';
import {AdminCvListRouterModule} from './admin-cv-list-routing.module';
import { ResumePageComponent } from '../team/resume-page/resume-page.component';
import {CommonModule} from "@angular/common";
import { TemplatesModule } from 'src/app/modules/shared/templates/templates.module';

@NgModule({
	imports: [AdminCvListRouterModule, TemplatesModule, CommonModule],
	declarations: [
   ResumePageComponent
	]
})

export class AdminCvListModule{}
