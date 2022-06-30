import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginByUrlComponent} from './login-by-url/login-by-url.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [CanLoginingGuard],
  },
  { path: 'registration',
   component: RegisterComponent,
    // canActivate: [CanLoginingGuard],
  },
  { path: ':shortUrl', component: LoginByUrlComponent },
  { path: ':shortUrl/:teamId', component: LoginByUrlComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
