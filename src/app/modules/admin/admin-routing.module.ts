import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UsersGuard } from 'src/app/guards/users.guard';
import { Users } from 'src/app/models/users-type';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';


const routs: Routes = [
  {
    path: '', component: AdminLayoutComponent, 
    children: [
      {
        path: 'resume',
        loadChildren: () => import('./page/resume/admin-cv-list.module').then(mod => mod.AdminCvListModule)
      },
      {
        path: 'languages',
        loadChildren: () => import('./page/language/language.module').then(mod => mod.LanguageModule),
        
      },
      {
        path: 'skills',
        loadChildren: () => import('./page/skill/skill.module').then(mod => mod.SkillModule)
      },

      {
        path: 'proposals',
        loadChildren: () => import('./page/proposal/proposal.module').then(mod => mod.ProposalModule)
      },
      {
        path: 'archive',
        loadChildren: () => import('./page/archive/archive.module').then(mod => mod.ArchiveModule)
      },
      {
        path: 'positions',
        loadChildren: () => import('./page/position/position.module').then(mod => mod.PositionModule)
      },
      {
        path: 'builds',
        loadChildren: () => import('./page/proposal-build/proposal-build.module').then(mod => mod.ProposalBuildModule)
      },
      {
        path:'complexities',
        loadChildren: () => import('./page/complexity/complexity.module').then(mod=>mod.ComplexityModule)
      },
      {
        path:'templates',
        loadChildren: () => import('./page/resume-template/resume-template.module').then(mod=>mod.ResumeTemplateModule)
      },
      {
        path:'clients',
        loadChildren: () => import('./page/clients/clients.module').then(mod=>mod.ClientsModule)
      },
         {
        path: '',
        redirectTo: 'resume',
        pathMatch: 'full'
      },
    ]
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(routs),
  ],
  declarations: [],
  exports: [RouterModule],

})

export class AdminRouterModule {

}
