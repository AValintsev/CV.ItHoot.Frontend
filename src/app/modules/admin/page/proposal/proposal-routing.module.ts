import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProposalPage} from "./page/proposal-page/proposal-page.component";
import {ProposalListPage} from "./page/proposal-list-page/proposal-list-page.component";
import {ProposalResumeEditPage} from './page/proposal-resume-edit-page/proposal-resume-edit-page.component';
import {ProposalResumePage} from './page/resume-page/proposal-resume-page.component';


const routes: Routes = [
  {
    path: '',
    component: ProposalListPage
  },
  {
    path: ':id',
    component:ProposalPage
  },
  {
    path:':proposalId/resume/edit/:resumeId',
    component:ProposalResumeEditPage
  },
  {
    path:':proposalId/resume/:resumeId',
    component:ProposalResumePage
  }

];

@NgModule({
  declarations: [],
  imports:
    [
      CommonModule,
      RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }
