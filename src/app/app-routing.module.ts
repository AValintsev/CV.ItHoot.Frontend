import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from './guards/role.guard';


const routes: Routes = [
   {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
  },
   {
    path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule),
  },
   {
    path: '',
    canActivate: [RoleGuard],
    children:[]
  },

  {
    path: 'home', loadChildren: () => import('./modules/main-page/main-page.module').then(mod => mod.MainPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
