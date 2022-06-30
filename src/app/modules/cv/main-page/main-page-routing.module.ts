import {Users} from './../../../models/users-type';
import {HeaderModule} from '../../core/header/header.module';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {FooterModule} from '../../core/footer/footer.module';
import {UsersGuard} from 'src/app/guards/users.guard';
import {LoaderModule} from '../../shared/components/loader/loader.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '', component: MainPageComponent,
      canActivate: [UsersGuard],
      data: { role: [Users[2]] },
      children: [
        {
          path: 'cv', loadChildren: () => import('../cv.module').then(mod => mod.CvModule),
        },
      ]
    }

  ]),
  MatButtonModule,
  FooterModule,
  HeaderModule,
  LoaderModule
],
  exports: [RouterModule],
  declarations: [
    MainPageComponent,
  ]
})

export class MainPageRoutingModule {
}
