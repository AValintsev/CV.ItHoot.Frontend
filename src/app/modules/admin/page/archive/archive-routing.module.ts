import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ResumeViewPage} from '../resume/page/resume-view-page/resume-view-page.component';
import {ResumeEditPage} from '../resume/page/resume-edit-page/edit-page.component';
import {ProposalArchiveListPageComponent} from './proposal-archive-list-page/proposal-archive-list-page.component';
import {ProposalArchivePageComponent} from './proposal-page/proposal-archive-page.component';
import {ResumeArchiveListComponent} from './resume-archive-list/resume-archive-list.component';


const routes: Routes = [
  {
    path: 'proposals',
    component: ProposalArchiveListPageComponent
  },
  {
    path: 'proposals/:proposalId',
    component: ProposalArchivePageComponent
  },
    {
    path: 'proposals/:proposalId/resume/:resumeId',
    component: ResumeViewPage,
  },
    {
    path: 'proposals/:proposalId/resume/edit/:resumeId',
      component: ResumeEditPage
  },
  {
    path: 'resume',
    component: ResumeArchiveListComponent
  },
  {
    path: 'resume/:resumeId',
    component: ResumeViewPage
  },

  {
    path: 'resume/edit/:resumeId',
    component: ResumeEditPage
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
