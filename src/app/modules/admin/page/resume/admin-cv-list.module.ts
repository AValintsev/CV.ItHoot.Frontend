import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {AdminCvListRouterModule} from './admin-cv-list-routing.module';
import {CommonModule} from "@angular/common";
import {EditPageComponent} from '../edit-page/edit-page.component';
import {CreatePageComponent} from '../create-page/create-page.component';
import {FormBarComponent} from '../form-bar/form-bar.component';
import {SkillDialog} from '../../component/modals/skill-dialog/skill-dialog.component';
import {ExperienceDialog} from '../../component/modals/experience-dialog/experience-dialog.component';
import {EducationDialog} from '../../component/modals/education-dialog/education-dialog.component';
import {LanguageDialog} from '../../component/modals/language-dialog/language-dialog.component';
import {CvFullComponent} from '../cv-full/cv-full.component';


@NgModule({
	imports: [
		AdminCvListRouterModule,
		MatIconModule,
		MatSelectModule,
		CommonModule,
		MatCardModule,
		MatDividerModule,
		MatChipsModule,
		MatDatepickerModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatInputModule,
		MatFormFieldModule,
		MatAutocompleteModule,
      MatCardModule
	],
	declarations: [
		EditPageComponent,
		CreatePageComponent,
		FormBarComponent,
		SkillDialog,
		LanguageDialog,
		ExperienceDialog,
		EducationDialog,
		CvFullComponent,
	]
})

export class AdminCvListModule { }
