import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivePageComponent } from './archive-page/archive-page.component';
import { ArchiveListPageComponent } from './archive-list-page/archive-list-page.component';
import {TeamRoutingModule} from "../team/team-routing.module";
import {TeamModule} from "../team/team.module";
import {ArchiveRoutingModule} from "./archive-routing.module";



@NgModule({
  declarations: [
    ArchivePageComponent,
    ArchiveListPageComponent
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule,
    TeamModule,
    TeamRoutingModule
  ]
})
export class ArchiveModule { }
