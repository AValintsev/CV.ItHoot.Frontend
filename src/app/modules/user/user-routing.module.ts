import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResumeViewPageComponent} from './resume-view-page/resume-view-page.component';
import {ResumeCreatePageComponent} from "./resume-create-page/resume-create-page.component";
import {ResumeEditPageComponent} from "./resume-edit-page/resume-edit-page.component";
import {ResumeListPageComponent} from './resume-list-page/resume-list-page.component';
import {MainPageComponent} from "./main-page/main-page.component";


const routes: Routes = [
  {
    path: '',
    component:MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'resume',
        pathMatch: 'full'
      },
      {
        path: 'resume',
        component: ResumeListPageComponent,
      },
      {
        path: 'resume/edit/:id',
        component: ResumeEditPageComponent,
      },

      {
        path: 'resume/create',
        component: ResumeCreatePageComponent
      },
      {
        path: 'resume/:id',
        component: ResumeViewPageComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user-settings/user-settings.module').then((mod) => mod.UserSettingsModule),
      },
    ],

  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
