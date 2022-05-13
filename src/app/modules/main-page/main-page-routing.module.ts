import {FooterComponent} from '../core/footer/footer.component';
import {HeaderComponent} from '../core/header/header.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {AuthBarComponent} from '../core/auth-bar/auth-bar.component';
import {CommonModule} from '@angular/common';
import {CoreModule} from "../core/core.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '', component: MainPageComponent, children: [
        {
          path: 'cv', loadChildren: () => import('./../cv/cv.module').then(mod => mod.CvModule),
        },
        {
          path: 'skills',
          loadChildren: () => import('./../skill/skill.module').then(mod => mod.SkillModule)
        },
        {
          path: 'languages',
          loadChildren: () => import('./../language/language.module').then(mod => mod.LanguageModule)
        },
      ]
    }

    // {
    //   path: '', redirectTo: 'cv', pathMatch: 'full'
    // }


  ]), CoreModule, MatButtonModule],
  exports: [RouterModule],
  declarations: [HeaderComponent, FooterComponent, MainPageComponent, AuthBarComponent]
})

export class MainPageRoutingModule {
}
