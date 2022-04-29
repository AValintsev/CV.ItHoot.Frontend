import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
  },
  {
    path: 'cv', loadChildren: () => import('./cv/cv.module').then(mod => mod.CvModule),
  },
  {
    path: 'editor', loadChildren: ()=> import('./cv-editor/cv-editor.module').then(mod => mod.CvEditorModule)
  },
  {
   path:'', redirectTo: 'cv', pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
