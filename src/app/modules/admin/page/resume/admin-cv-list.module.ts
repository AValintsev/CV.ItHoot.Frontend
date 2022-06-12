import {NgModule} from '@angular/core';
import {AdminCvListRouterModule} from './admin-cv-list-routing.module';
import {CommonModule} from "@angular/common";
import { TemplatesModule } from 'src/app/modules/shared/templates/templates.module';

@NgModule({
	imports: [AdminCvListRouterModule, TemplatesModule, CommonModule],
	declarations: []
})

export class AdminCvListModule{}
