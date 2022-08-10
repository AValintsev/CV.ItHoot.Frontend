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
import {ProposalComponent} from '../proposal/proposal.component';
import {UsersGuard} from 'src/app/guards/users.guard';
import {Users} from 'src/app/models/users-type';
import {LoaderModule} from 'src/app/modules/shared/components/loader/loader.module';
import {DeleteModalService} from "../../../../services/delete-modal.service";
import {ResumeTemplateBuilderModule} from "../../../shared/resume-template-builder/resume-template-builder.module";


const routes: Routes = [
  {
    path: '', component: MainPageComponent,
    canActivate: [UsersGuard],
    data: { role: [Users[3]] },
    children: [
      {
        path: 'proposals', 
        canActivate: [UsersGuard],
        data: { role: [Users[3]] },
        component: ProposalsComponent
      },
      {
        path: 'proposal/:proposalId/resume/:resumeId',
        canActivate: [UsersGuard],
        data: { role: [Users[3]] },
        component: ResumeComponent
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
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    FooterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    ModalDeleteUserModule,
    LoaderModule,
    RouterModule.forChild(routes),
    ResumeTemplateBuilderModule,
  ],
  exports: [
    MainPageComponent,
    ProposalsComponent,
    ResumeComponent,
  ],
  providers:[

    DeleteModalService]

})

export class MainPageRoutingModule {
}
