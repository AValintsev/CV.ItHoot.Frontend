import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AccountGuard } from './guards/account.guard';
import { AuthenticationGuard } from './guards/authentication.guard';


const routes: Routes = [
  {
    path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule),
  },
  {
    path: 'home', loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule), 
  },
  // {
  //   path: '', redirectTo:'account',pathMatch:"full"
  // },
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
