import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProposalArchiveListPageComponent} from './proposal-archive-list-page/proposal-archive-list-page.component';
import {ResumeArchiveListComponent} from './resume-archive-list/resume-archive-list.component';


const routes: Routes = [
  {
    path: 'proposals',
    component: ProposalArchiveListPageComponent
  },
  {
    path: 'resume',
    component: ResumeArchiveListComponent
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
