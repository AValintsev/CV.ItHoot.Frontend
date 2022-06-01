import { TemplatesModule } from './../../../shared/templates/templates.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { ResumeComponent } from '../resume/resume.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: 'teams', component: TeamsComponent
      },
      {
        path: 'team/:teamId/resume/:resumeId', component: ResumeComponent
      },
      {
        path: '', redirectTo: 'teams', pathMatch: 'full'
      },
    ]
  }

]

@NgModule({
  declarations: [
    MainPageComponent, 
    TeamsComponent, 
    ModalDeleteUserComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FooterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FontAwesomeModule,
    HeaderModule,
    FormsModule,
    TemplatesModule,
    ReactiveFormsModule, 
    RouterModule.forChild(routes),
  ],
  exports: [
    MainPageComponent,
    TeamsComponent,
    ModalDeleteUserComponent,
    ResumeComponent
  ],

})

export class MainPageRoutingModule {
}
