import { HeaderModule } from './../core/header/header.module';
import {FooterComponent} from '../core/footer/footer.component';
import {HeaderComponent} from '../core/header/header.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
// import {AuthBarComponent} from '../core/auth-bar/auth-bar.component';
import {CommonModule} from '@angular/common';
import {CoreModule} from "../core/core.module";
import {MatButtonModule} from "@angular/material/button";
import { FooterModule } from '../core/footer/footer.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '', component: MainPageComponent, children: [
        {
          path: 'cv', loadChildren: () => import('./../cv/cv.module').then(mod => mod.CvModule),
        },

      ]
    }

    // {
    //   path: '', redirectTo: 'cv', pathMatch: 'full'
    // }


  ]), 
  CoreModule, 
  MatButtonModule,
  FooterModule, 
  HeaderModule
],
  exports: [RouterModule],
  declarations: [
    MainPageComponent, 
    // AuthBarComponent
  ]
})

export class MainPageRoutingModule {
}
