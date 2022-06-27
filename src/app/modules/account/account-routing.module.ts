import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginByUrlComponent } from './login-by-url/login-by-url.component';
import { CanLoginingGuard } from 'src/app/guards/canLogining.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanLoginingGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: 'registration', component: RegisterComponent },
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
