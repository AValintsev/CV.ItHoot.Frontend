import {NgModule} from "@angular/core";
import {TeamBuildRoutingModule} from "./teamBuild-routing.module";
import { TeamBuildsListComponent } from './team-builds-list/team-builds-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import { TeamBuildDialogComponent } from './team-build-dialog/team-build-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { TeamBuildPositionDialogComponent } from './team-build-position-dialog/team-build-position-dialog.component';

@NgModule({
  imports: [
    TeamBuildRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [
  ],
  declarations: [


    TeamBuildsListComponent,
        TeamBuildDialogComponent,
        TeamBuildPositionDialogComponent
  ]
})

export class TeamBuildModule {
}
