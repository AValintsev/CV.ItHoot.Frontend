import {NgModule} from '@angular/core';
import {ProposalRoutingModule} from "./proposal-routing.module";
import {ProposalCreateDialogComponent} from './proposal-create-dialog/proposal-create-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ProposalPageComponent} from './page/proposal-page/proposal-page.component';
import {MatTableModule} from "@angular/material/table";
import {ProposalSettingDialogComponent} from './proposal-setting-dialog/proposal-setting-dialog.component';
import {ProposalAddResumeDialogComponent} from './proposal-add-resume-dialog/proposal-add-resume-dialog.component';
import {ProposalComponent} from './proposal/proposal.component';
import {ProposalListPageComponent} from './page/proposal-list-page/proposal-list-page.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxLoadingButtonsModule} from "ngx-loading-buttons";
import {PdfTableAction} from "./pdf-table-action/pdf-table-button.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {
  ProposalResumeDownloadPageComponent
} from '../../../cv/proposal-resume-download-page/proposal-resume-download-page.component';
import {DateUtcPipe} from "../../../../helpers/date.pipe";
import {ResumePageComponent} from "./page/resume-page/resume-page.component";
import {ProposalListComponent} from "./proposal-list/proposal-list.component";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  imports: [
    ProposalRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatCheckboxModule,
    NgxLoadingButtonsModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    ProposalListPageComponent,
    DateUtcPipe,
    ProposalListComponent
  ],
  declarations: [
    DateUtcPipe,
    ResumePageComponent,
    ProposalListComponent,
    ProposalCreateDialogComponent,
    ProposalPageComponent,
    ProposalSettingDialogComponent,
    ProposalAddResumeDialogComponent,
    ProposalComponent,
    ProposalListPageComponent,
    PdfTableAction,
    ProposalResumeDownloadPageComponent,
  ]
})

export class ProposalModule {
}
