import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreatePageComponent} from '../create-page/create-page.component';
import {EditPageComponent} from '../edit-page/edit-page.component';
import {CvFullComponent} from '../cv-full/cv-full.component';
import {ResumeListPageComponent} from './page/resume-list-page/resume-list-page.component';


const routes: Routes = [
	{
		path: '',
		component: ResumeListPageComponent,
	},
	{
		path: 'edit/:id',
		component: EditPageComponent,
	},
	{
		path: 'create',
		component: CreatePageComponent
	},
	{
		path: ':id',
		component: CvFullComponent,
		data: { url:'/admin/resume'}
	},

];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminCvListRouterModule { }
