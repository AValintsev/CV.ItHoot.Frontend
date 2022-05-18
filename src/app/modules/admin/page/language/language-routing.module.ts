import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LanguageDialog } from './language-dialog/language-dialog.component';
import { LanguagePageComponent } from './language-page/language-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
	{ path: '', component: LanguagePageComponent}
]

@NgModule({
	declarations: [LanguagePageComponent, LanguageDialog],
	imports: [
		MaterialModule,
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
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})

export class LanguageRouterModule { }