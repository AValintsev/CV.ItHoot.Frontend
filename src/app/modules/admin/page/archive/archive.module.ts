import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchivePageComponent} from './archive-page/archive-page.component';
import {ArchiveListPageComponent} from './archive-list-page/archive-list-page.component';
import {ArchiveRoutingModule} from "./archive-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {ProposalModule} from "../proposal/proposal.module";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ArchivePageComponent,
    ArchiveListPageComponent,
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
  ]
})
export class ArchiveModule { }
