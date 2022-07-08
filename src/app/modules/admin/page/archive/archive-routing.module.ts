import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { CvFullComponent } from '../cv-full/cv-full.component';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { ProposalPageComponent } from '../proposal/page/proposal-page/proposal-page.component';
import {ProposalArchiveListPageComponent} from './proposal-archive-list-page/proposal-archive-list-page.component';
import {ResumeArchiveListComponent} from './resume-archive-list/resume-archive-list.component';


const routes: Routes = [
  {
    path: 'proposals',
    component: ProposalArchiveListPageComponent
  },
  {
    path: 'proposals/:id',
    component: ProposalPageComponent
  },
  {
    path: 'resume',
    component: ResumeArchiveListComponent
  },
  {
    path: 'resume/:id',
    component: CvFullComponent
  },
  {
    path: 'resume/edit/:id',
    component: EditPageComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
