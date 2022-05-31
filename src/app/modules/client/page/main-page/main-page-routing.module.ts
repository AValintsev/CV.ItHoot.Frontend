import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from '../../shared/header/header.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { FooterModule } from '../../shared/footer/footer.module';
import { CardsRowComponent } from '../../component/cards-row/cards-row.component';
import { ModalDeleteUserComponent } from '../../component/modal-delete-user/modal-delete-user.component';
import { TeamComponent } from '../team/team.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamsComponent } from '../teams/teams.component';
import { TeamMiniCardComponent } from '../../component/team-mini-card/team-mini-card.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: 'teams', component: TeamsComponent
      },
      {
        path: 'team/:id', component: TeamComponent
      },
      {
        path: '', redirectTo:'teams-list',pathMatch:'full'
      },
    ]
  }

]

@NgModule({
  declarations: [
    MainPageComponent, TeamMiniCardComponent, TeamsComponent,
    TeamComponent, CardsRowComponent, ModalDeleteUserComponent
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
  exports: [MainPageComponent, TeamMiniCardComponent, TeamsComponent,
    TeamComponent, CardsRowComponent, ModalDeleteUserComponent],

})

export class MainPageRoutingModule {
}
