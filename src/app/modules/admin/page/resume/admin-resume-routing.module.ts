import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ResumeListPage} from "./page/resume-list-page/resume-list-page.component";
import {ResumeEditPage} from "./page/resume-edit-page/edit-page.component";
import {ResumeCreatePage} from "./page/resume-create-page/resume-create-page.component";
import {ResumeViewPage} from "./page/resume-view-page/resume-view-page.component";


const routes: Routes = [
	{
		path: '',
		component: ResumeListPage,
	},
	{
		path: 'edit/:id',
		component: ResumeEditPage,
	},
	{
		path: 'create',
		component: ResumeCreatePage
	},
	{
		path: ':id',
		component: ResumeViewPage,
	},

];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminResumeRouterModule { }
