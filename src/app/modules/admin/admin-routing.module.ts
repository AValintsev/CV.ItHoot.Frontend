import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {SideBarComponent} from './component/side-bar/side-bar.component';
import {FooterModule} from '../core/footer/footer.module';
import {HeaderModule} from '../core/header/header.module';


const routs: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {
        path: 'resume',
        loadChildren: () => import('./page/resume/admin-cv-list.module').then(mod => mod.AdminCvListModule)
      },
      {
        path: 'languages',
        loadChildren: () => import('./page/language/language.module').then(mod => mod.LanguageModule)
      },
      {
        path: 'skills',
        loadChildren: () => import('./page/skill/skill.module').then(mod => mod.SkillModule)
      },
      {
        path: '',
        redirectTo: 'resume',
        pathMatch: 'full'
      },
      {
        path: 'teams',
        loadChildren: () => import('./page/team/team.module').then(mod => mod.TeamModule)
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
        loadChildren: () => import('./page/team-build/teamBuild.module').then(mod => mod.TeamBuildModule)
      },
      {
        path:'complexities',
        loadChildren: () => import('./page/complexity/complexity.module').then(mod=>mod.ComplexityModule)
      }
    ]
  }

]

@NgModule({
  imports: [

    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    FooterModule,
    HeaderModule,
    RouterModule.forChild(routs),
  ],
  declarations: [AdminLayoutComponent, SideBarComponent],
  exports: [AdminLayoutComponent, SideBarComponent],

})

export class AdminRouterModule {

}
