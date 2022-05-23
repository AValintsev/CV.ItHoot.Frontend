import {HeaderModule} from '../core/header/header.module';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {FooterModule} from '../core/footer/footer.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '', component: MainPageComponent, children: [
        {
          path: 'cv', loadChildren: () => import('./../cv/cv.module').then(mod => mod.CvModule),
        },

      ]
    }

  ]),
  MatButtonModule,
  FooterModule,
  HeaderModule
],
  exports: [RouterModule],
  declarations: [
    MainPageComponent,
  ]
})

export class MainPageRoutingModule {
}
