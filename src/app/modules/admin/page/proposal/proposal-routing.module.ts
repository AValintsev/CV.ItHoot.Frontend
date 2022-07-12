import { CommonModule } from '@angular/common';
import { EditPageComponent } from './../edit-page/edit-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProposalPageComponent} from "./page/proposal-page/proposal-page.component";
import {ProposalListPageComponent} from "./page/proposal-list-page/proposal-list-page.component";
import {ResumePageComponent} from "./page/resume-page/resume-page.component";

const routes: Routes = [
  {
    path: '',
    component: ProposalListPageComponent
  },
  {
    path: ':id',
    component:ProposalPageComponent
  },
  {
    path: ':id/resume/edit/:id',
    component:EditPageComponent
  },
  {
    path:':proposalId/resume/:resumeId',
    component:ResumePageComponent
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
