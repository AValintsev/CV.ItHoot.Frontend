import {Users} from './models/users-type';
import {UsersGuard} from './guards/users.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from './guards/role.guard';
import {
  ResumeDownloadPageComponent
} from "./modules/shared/proposal-resume-download-page/resume-download-page.component";
import {ResumeFullSwitcherComponent} from "./modules/shared/resume-full-switcher/resume-full-switcher.component";


const routes: Routes = [

  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [UsersGuard],
    canActivate: [UsersGuard],
    data:{role:[Users[0],Users[1],Users[4]]}
  },
  {
    path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule),
    // canLoad: [CanLoginingGuard]
  },
  {
    path: 'home', loadChildren: () => import('./modules/user/main-page/main-page.module').then(mod => mod.MainPageModule),
    canLoad: [UsersGuard],
    canActivate: [UsersGuard],
    data: { role: [Users[2]] }
  },
  {
    path: '',
    canActivate: [RoleGuard],
    children: []
  },
  {
    path: 'client', loadChildren: () => import('./modules/client/client.module').then(mod => mod.ClientModule),
    canLoad: [UsersGuard],
    canActivate: [UsersGuard],
    data: { role: [Users[3]] }
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

