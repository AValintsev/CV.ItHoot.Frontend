import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import {
  ProposalResumeDownloadPageComponent
} from "./modules/cv/proposal-resume-download-page/proposal-resume-download-page.component";
import {ResumeFullSwitcherComponent} from "./modules/cv/resume-full-switcher/resume-full-switcher.component";


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
    children: []
  },
  {
    path: 'home', loadChildren: () => import('./modules/cv/main-page/main-page.module').then(mod => mod.MainPageModule),
  },
  {
    path: 'client', loadChildren: () => import('./modules/client/client.module').then(mod => mod.ClientModule),
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
    path : 'proposals/resume/:shortUrl/pdf',
    component: ProposalResumeDownloadPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
