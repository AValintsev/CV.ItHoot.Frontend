import {Users} from '../../../models/users-type';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {CommonModule} from '@angular/common';
import {UsersGuard} from 'src/app/guards/users.guard';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '', component: MainPageComponent,
      canActivate: [UsersGuard],
      data: { role: [Users[2]] },
      children: [
        {
          path: 'cv', loadChildren: () => import('../user.module').then(mod => mod.UserModule),
          canLoad:[UsersGuard],
          canActivateChild: [UsersGuard],
          data: {
            role: [Users[2]]
          },
        },
      ]
    }

  ]),

],
  exports: [RouterModule],
  declarations: [

  ],

})

export class MainPageRoutingModule {
}