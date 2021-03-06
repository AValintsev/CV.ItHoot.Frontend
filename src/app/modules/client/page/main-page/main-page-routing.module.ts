import {ModalDeleteUserModule} from '../../../shared/modals/modal-delete-user/modal-delete-user.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {HeaderModule} from '../../shared/header/header.module';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {FooterModule} from '../../shared/footer/footer.module';
import {MatDialogModule} from '@angular/material/dialog';
import {ProposalsComponent} from '../proposals/proposals.component';
import {ResumeComponent} from '../resume/resume.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ProposalComponent} from '../proposal/proposal.component';


const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: 'proposals', component: ProposalsComponent
      },
      {
        path: 'proposal/:proposalId/resume/:resumeId', component: ResumeComponent
      },
      {
        path: '', redirectTo: 'proposals', pathMatch: 'full'
      },
    ]
  }

]

@NgModule({
  declarations: [
    MainPageComponent,
    ProposalsComponent,
    ResumeComponent,
    ProposalComponent
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
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    ModalDeleteUserModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MainPageComponent,
    ProposalsComponent,
    ResumeComponent,
    ProposalComponent
  ],

})

export class MainPageRoutingModule {
}
