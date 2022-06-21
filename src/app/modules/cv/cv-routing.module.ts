import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CvFullComponent} from './cv-full/cv-full.component';
import {CvCreatePageComponent} from "./cv-create-page/cv-create-page.component";
import {CvEditPageComponent} from "./cv-edit-page/cv-edit-page.component";
import { UserCvListComponent } from './user-cv-list/user-cv-list.component';
import { DeleteComponent } from './delete/delete.component';


const routes: Routes = [
  {
    path: 'edit/:id',
    component: CvEditPageComponent
  },

  {
    path: 'create',
    component: CvCreatePageComponent
  },
  {
    path: 'user-list',
    component: UserCvListComponent,
    // canActivate: [CheckUserGuard]
  },

  {
    path: ':id',
    component: CvFullComponent,
    // canActivate: [CheckUserGuard]
  },
  {
    path: '',
    redirectTo:'user-list',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
