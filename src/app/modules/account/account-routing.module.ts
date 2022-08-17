import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LoginByUrlComponent} from './login-by-url/login-by-url.component';
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {path: ':shortUrl', component: LoginByUrlComponent},
  {path: ':shortUrl/:teamId', component: LoginByUrlComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {
}
