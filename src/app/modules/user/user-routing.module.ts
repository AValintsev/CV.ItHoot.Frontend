import {Users} from '../../models/users-type';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResumeViewPageComponent} from './resume-view-page/resume-view-page.component';
import {ResumeCreatePageComponent} from "./resume-create-page/resume-create-page.component";
import {ResumeEditPageComponent} from "./resume-edit-page/resume-edit-page.component";
import {ResumeListPageComponent} from './resume-list-page/resume-list-page.component';
import {UsersGuard} from 'src/app/guards/users.guard';


const routes: Routes = [
  {path:'',
  canActivateChild: [UsersGuard],
  data: {
    role: [Users[2]]
  },
  children:[
     {
    path: 'edit/:id',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: ResumeEditPageComponent,
  },

  {
    path: 'create',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: ResumeCreatePageComponent
  },
  {
    path: 'user-list',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: ResumeListPageComponent,
    // canActivate: [CheckUserGuard]
  },

  {
    path: ':id',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: ResumeViewPageComponent,
    // canActivate: [CheckUserGuard]
  },
  {
    path: '',
    redirectTo:'user-list',
    pathMatch:'full'
  }
  ],

}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
