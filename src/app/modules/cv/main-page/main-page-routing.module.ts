import {Users} from './../../../models/users-type';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {CommonModule} from '@angular/common';
import {UsersGuard} from 'src/app/guards/users.guard';
import {LoaderModule} from '../../shared/components/loader/loader.module';
import {DeleteModalService} from 'src/app/services/delete-modal.service';

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

],
  exports: [RouterModule],
  declarations: [
    
  ],

})

export class MainPageRoutingModule {
}
