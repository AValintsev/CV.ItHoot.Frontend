import { UserCvListGuard } from './../../guards/userCvList.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CvFullComponent} from './cv-full/cv-full.component';
import {CvListComponent} from './cv-list/cv-list.component';
import {CvCreatePageComponent} from "./cv-create-page/cv-create-page.component";
import {CvEditPageComponent} from "./cv-edit-page/cv-edit-page.component";
import { CheckUserGuard } from 'src/app/guards/checkUser.guard';

const routes: Routes = [
  {
    path: '',
    component: CvListComponent,
    // canActivate:[UserCvListGuard]
  },
  {
    path: 'edit/:id',
    component: CvEditPageComponent
  },

  {
    path: 'create',
    component: CvCreatePageComponent
  },
  {
    path: ':id',
    component: CvFullComponent,
    canActivate: [CheckUserGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
