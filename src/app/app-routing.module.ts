import { Users } from './models/users-type';
import { UsersGuard } from './guards/users.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import {
  ProposalResumeDownloadPageComponent
} from "./modules/cv/proposal-resume-download-page/proposal-resume-download-page.component";
import { ResumeFullSwitcherComponent } from "./modules/cv/resume-full-switcher/resume-full-switcher.component";
import { TestComponent } from './modules/test/test.component';
import { Test2Component } from './modules/test2/test2.component';
import { CanLoginingGuard } from './guards/canLogining.guard';



const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [UsersGuard],
    data:{role:[Users[0],Users[1]]}
  },
  {
    path: 'account', loadChildren: () => import('./modules/account/account.module').then(mod => mod.AccountModule),
    canLoad: [CanLoginingGuard]
  },
  {
    path: '',
    canActivate: [RoleGuard],
    children: []
  },
  {
    path: 'home', loadChildren: () => import('./modules/cv/main-page/main-page.module').then(mod => mod.MainPageModule),
    canLoad: [UsersGuard],
    canActivate: [UsersGuard],
    data: { role: [Users[2]] }
  },
  {
    path: 'client', loadChildren: () => import('./modules/client/client.module').then(mod => mod.ClientModule),
    canLoad: [UsersGuard],
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
    path : 'proposals/resume/:shortUrl/pdf',
    component: ProposalResumeDownloadPageComponent
  },
  {
    path:'test1',
    component:TestComponent
  },
  {
    path:'test2',
    component:Test2Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
