import {NgModule} from '@angular/core';
import {ProposalBuildRoutingModule} from './proposal-build-routing.module';
import {ProposalBuildsListComponent} from './proposal-builds-list/proposal-builds-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {ProposalBuildDialogComponent} from './proposal-build-dialog/proposal-build-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {
  ProposalBuildPositionDialogComponent
} from './proposal-build-position-dialog/proposal-build-position-dialog.component';
import {DirectivesModule} from 'src/app/modules/shared/directives/directives.module';


@NgModule({
  imports: [
    ProposalBuildRoutingModule,
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
    MatChipsModule,
    DirectivesModule
  ],
  exports: [],
  declarations: [

    ProposalBuildsListComponent,
    ProposalBuildDialogComponent,
    ProposalBuildPositionDialogComponent,
  ],
})
export class ProposalBuildModule {}
