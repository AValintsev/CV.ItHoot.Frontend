import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {LanguageDialogComponent} from './language-dialog/language-dialog.component';
import {LanguagePageComponent} from './language-page/language-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { DeleteModalService } from 'src/app/services/delete-modal.service';

const routes:Routes = [
	{ path: '', component: LanguagePageComponent}
]

@NgModule({
	declarations: [LanguagePageComponent, LanguageDialogComponent],
  imports: [
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
    RouterModule.forChild(routes),
    MatButtonToggleModule
  ],
	exports: [RouterModule],
  providers:[DeleteModalService]
})

export class LanguageRouterModule { }
