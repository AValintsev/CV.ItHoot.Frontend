import {UserRole} from './models/users-type';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ResumeDownloadPageComponent
} from "./modules/shared/proposal-resume-download-page/resume-download-page.component";
import {ResumeFullSwitcherComponent} from "./modules/shared/resume-full-switcher/resume-full-switcher.component";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";


const routes: Routes = [

  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data:{role:[UserRole.Admin, UserRole.HR, UserRole.Sale]}
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule),
  },
  {
    path: 'home', loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { role: [UserRole.User] }
  },
  {
    path: '',
    canActivate: [RoleGuard],
    children:[]
  },
  {
    path: 'client', loadChildren: () => import('./modules/client/client.module').then(mod => mod.ClientModule),
    canLoad: [RoleGuard],
    canActivate: [RoleGuard],
    data: { role: [UserRole.Client] }
  },

  {
    path: 'proposals/:proposalId/resume/:resumeId',
    component: ResumeFullSwitcherComponent
  },
  {
    path: 'proposals/resume/:shortUrl',
    component: ResumeFullSwitcherComponent
  },
  {
    path: 'resume/:resumeId',
    component: ResumeFullSwitcherComponent
  },
  {
    path: 'resume/url/:resumeUrl',
    component: ResumeFullSwitcherComponent
  },
  {
    path : 'proposals/resume/:shortUrl/:docType',
    component: ResumeDownloadPageComponent
  },
  {
    path : 'resume/url/:resumeShortUrl/:docType',
    component: ResumeDownloadPageComponent
  },
  {
    path:'**',
    redirectTo:''
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

