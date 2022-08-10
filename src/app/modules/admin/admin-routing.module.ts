import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersGuard } from 'src/app/guards/users.guard';
import { Users } from 'src/app/models/users-type';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routs: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canLoad: [UsersGuard],
    canActivate: [UsersGuard],
    data: { role: [Users[0], Users[1], Users[4]] },
    children: [
      {
        path: 'resume',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/resume/admin-cv-list.module').then(
            (mod) => mod.AdminCvListModule
          ),
      },
      {
        path: 'languages',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/language/language.module').then(
            (mod) => mod.LanguageModule
          ),
      },
      {
        path: 'skills',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/skill/skill.module').then((mod) => mod.SkillModule),
      },

      {
        path: 'proposals',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/proposal/proposal.module').then(
            (mod) => mod.ProposalModule
          ),
      },
      {
        path: 'archive',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/archive/archive.module').then(
            (mod) => mod.ArchiveModule
          ),
      },
      {
        path: 'positions',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/position/position.module').then(
            (mod) => mod.PositionModule
          ),
      },
      {
        path: 'builds',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/proposal-build/proposal-build.module').then(
            (mod) => mod.ProposalBuildModule
          ),
      },
      {
        path: 'complexities',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/complexity/complexity.module').then(
            (mod) => mod.ComplexityModule
          ),
      },
      {
        path: 'templates',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/resume-template/resume-template.module').then(
            (mod) => mod.ResumeTemplateModule
          ),
      },
      {
        path: 'clients',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/clients/clients.module').then(
            (mod) => mod.ClientsModule
          ),
      },
      {
        path: 'users',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/users/users.module').then((mod) => mod.UserModule),
      },
      {
        path: 'profile',
        canLoad: [UsersGuard],
        canActivate: [UsersGuard],
        data: { role: [Users[0], Users[1], Users[4]] },
        loadChildren: () =>
          import('./page/user-settings/user-settings.module').then(
            (mod) => mod.UserSettingslModule
          ),
      },

      {
        path: '',
        redirectTo: 'resume',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  declarations: [],
  exports: [RouterModule],
})
export class AdminRouterModule {}
