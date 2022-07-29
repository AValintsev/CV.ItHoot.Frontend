import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CvFullComponent} from '../cv-full/cv-full.component';
import {EditPageComponent} from '../edit-page/edit-page.component';
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
    component: CvFullComponent,
  },
    {
    path: 'proposals/:proposalId/resume/edit/:resumeId',
      component: EditPageComponent
  },
  {
    path: 'resume',
    component: ResumeArchiveListComponent
  },
  {
    path: 'resume/:resumeId',
    component: CvFullComponent
  },

  {
    path: 'resume/edit/:resumeId',
    component: EditPageComponent
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
