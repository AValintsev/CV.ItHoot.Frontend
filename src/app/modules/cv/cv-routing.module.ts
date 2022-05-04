import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvCreateComponent } from './cv-create/cv-create.component';
import { CvEditComponent } from './cv-edit/cv-edit.component';
import { CvFullComponent } from './cv-full/cv-full.component';
import { CvListComponent } from './cv-list/cv-list.component';
import { CvTestComponent } from './cv-test/cv-test.component';

const routes: Routes = [
  {
    path: ':id',
    component: CvFullComponent
  },
  {
    path: '',
    component: CvListComponent
  },
  {
    path: 'create',
    component: CvCreateComponent
  },
  {
    path: 'test1',
    component : CvTestComponent
  },
  
  {
    path: 'edit/:id',
    component: CvEditComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
