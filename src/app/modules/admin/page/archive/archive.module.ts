import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchiveRoutingModule} from "./archive-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {ProposalModule} from "../proposal/proposal.module";
import {MatButtonModule} from "@angular/material/button";
import {ResumeArchiveListComponent} from './resume-archive-list/resume-archive-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AdminCvListModule} from '../resume/admin-cv-list.module';
import {ProposalArchiveListPageComponent} from './proposal-archive-list-page/proposal-archive-list-page.component';


@NgModule({
  declarations: [
    ProposalArchiveListPageComponent,
    ResumeArchiveListComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    MatIconModule,
    MatTableModule,
    ProposalModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AdminCvListModule
  ],
})
export class ArchiveModule { }
