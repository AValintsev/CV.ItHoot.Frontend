import {NgModule} from '@angular/core';
import {TeamRoutingModule} from "./team-routing.module";
import {TeamDialogComponent} from './team-dialog/team-dialog.component';
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
import {TeamPageComponent} from './team-page/team-page.component';
import {MatTableModule} from "@angular/material/table";
import {TeamPageDialogComponent} from './team-page-dialog/team-page-dialog.component';
import {TeamPageResumeDialogComponent} from './team-page-resume-dialog/team-page-resume-dialog.component';
import {TeamComponent} from './team/team.component';
import {TeamListPageComponent} from './team-list-page/team-list-page.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxLoadingButtonsModule} from "ngx-loading-buttons";
import {PdfTableButton} from "./table-actions/pdf-table-button.component";

@NgModule({
  imports: [
    TeamRoutingModule,
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
  ],
  exports: [
    TeamListPageComponent
  ],
  declarations: [
    TeamDialogComponent,
    TeamPageComponent,
    TeamPageDialogComponent,
    TeamPageResumeDialogComponent,
    TeamComponent,
    TeamListPageComponent,
    PdfTableButton,
  ]
})

export class TeamModule {
}
