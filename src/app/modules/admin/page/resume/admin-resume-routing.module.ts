import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ResumeListPage} from "./page/resume-list-page/resume-list-page.component";
import {ResumeEditPage} from "./page/resume-edit-page/edit-page.component";
import {ResumeCreatePage} from "./page/resume-create-page/resume-create-page.component";
import {ResumeViewPage} from "./page/resume-view-page/resume-view-page.component";
import {RoleGuard} from "../../../../guards/role.guard";
import {UserRole} from "../../../../models/users-type";
import {ResumeHistoryPage} from "./page/resume-history-page/resume-history-page.component";


const routes: Routes = [
	{
		path: '',
		component: ResumeListPage,
	},
  {
    path: ':resumeId/history',
    component: ResumeHistoryPage,
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { role: [UserRole.Admin] }
  },
	{
    path: 'edit/:id',
		component: ResumeEditPage,
    // canLoad: [RoleGuard],
    // canActivate: [RoleGuard],
    // data: { role: [UserRole.Admin,UserRole.HR] }
	},
	{
		path: 'create',
		component: ResumeCreatePage,
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { role: [UserRole.Admin,UserRole.HR] }
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
