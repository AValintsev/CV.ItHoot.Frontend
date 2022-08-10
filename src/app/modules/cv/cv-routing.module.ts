import {Users} from './../../models/users-type';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CvFullComponent} from './cv-full/cv-full.component';
import {CvCreatePageComponent} from "./cv-create-page/cv-create-page.component";
import {CvEditPageComponent} from "./cv-edit-page/cv-edit-page.component";
import {UserCvListComponent} from './user-cv-list/user-cv-list.component';
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
    component: CvEditPageComponent,
  },

  {
    path: 'create',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: CvCreatePageComponent
  },
  {
    path: 'user-list',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: UserCvListComponent,
    // canActivate: [CheckUserGuard]
  },

  {
    path: ':id',
    canActivateChild: [UsersGuard],
    data: {
      role: [Users[2]]
    },
    component: CvFullComponent,
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
export class CvRoutingModule { }
