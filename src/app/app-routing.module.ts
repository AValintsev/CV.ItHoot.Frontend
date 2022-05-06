import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageModule } from './modules/main-page/main-page.module';

const routes: Routes = [
  {
    path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule),
  },
  {
    path: 'home', loadChildren: ()=>import('./modules/main-page/main-page.module').then(m=>m.MainPageModule)
  },
  {
    path: '', redirectTo:'account',pathMatch:"full"
  },
  // {
    // path: '**', redirectTo:'account',pathMatch:"full"
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
