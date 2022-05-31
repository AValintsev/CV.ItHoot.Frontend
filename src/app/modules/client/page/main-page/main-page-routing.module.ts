import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from '../../shared/header/header.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { FooterModule } from '../../shared/footer/footer.module';
import { ModalDeleteUserComponent } from '../../component/modal-delete-user/modal-delete-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamsComponent } from '../teams/teams.component';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: 'teams', component: TeamsComponent
      },
      {
        path: '', redirectTo:'teams',pathMatch:'full'
      },
    ]
  }

]

@NgModule({
  declarations: [
    MainPageComponent, TeamsComponent
    , ModalDeleteUserComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FooterModule,
    HeaderModule,
    RouterModule.forChild(routes),
  ],
  exports: [MainPageComponent, TeamsComponent, ModalDeleteUserComponent],

})

export class MainPageRoutingModule {
}
