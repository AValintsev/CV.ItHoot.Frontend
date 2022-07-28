import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  ModalShowTemplateComponent
} from 'src/app/modules/shared/modals/modal-show-template/modal-show-template.component';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
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
  ResumeDownloadPageComponent
} from '../../../cv/proposal-resume-download-page/resume-download-page.component';
import {ProposalListComponent} from "./proposal-list/proposal-list.component";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {ProposalSalaryDialogComponent} from './proposal-salary-dialog/proposal-salary-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DirectivesModule} from "../../../shared/directives/directives.module";
import {ResumeTemplateBuilderModule} from "../../../shared/resume-template-builder/resume-template-builder.module";
import {ResumePageComponent} from './page/resume-page/resume-page.component';
import {ResumeEditPageComponent} from './page/resume-edite-page/resume-edit-page.component';
import {FormBarModule} from '../form-bar/form-bar.module';
import {PipesModule} from "../../../shared/directives/pipes.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgxSpinnerModule} from "ngx-spinner";

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
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    DirectivesModule,
    FormBarModule,
    ResumeTemplateBuilderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatButtonModule,
    NgxSpinnerModule,
  ],
  exports: [
    ProposalListPageComponent,
    ProposalListComponent,
    ProposalComponent,
  ],
  declarations: [
    ModalShowTemplateComponent,
    ResumePageComponent,
    ResumeEditPageComponent,
    ProposalListComponent,
    ProposalCreateDialogComponent,
    ProposalPageComponent,
    ProposalSettingDialogComponent,
    ProposalAddResumeDialogComponent,
    ProposalComponent,
    ProposalListPageComponent,
    PdfTableAction,
    ResumeDownloadPageComponent,
    ProposalSalaryDialogComponent,
  ],
  providers: [DeleteModalService]
})

export class ProposalModule {}
