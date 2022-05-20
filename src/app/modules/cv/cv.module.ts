import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CvRoutingModule} from './cv-routing.module';
import {CvFormComponent} from './cv-form/cv-form.component';
import {CvFullComponent} from './cv-full/cv-full.component';
import {CvSmallComponent} from './cv-small/cv-small.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CvCreatePageComponent} from './cv-create-page/cv-create-page.component';
import {CvLeftBarComponent} from './cv-leftbar/cv-left-bar.component';
import {SkillDialog} from './skill-dialog/skill-dialog.component';
import {LanguageDialog} from "./language-dialog/language-dialog.component";
import {EducationDialog} from './education-dialog/education-dialog.component';
import {ExperienceDialog} from './experience-dialog/experience-dialog.component';
import {CvEditPageComponent} from './cv-edit-page/cv-edit-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CvTemplateModule} from './cv-template/cv-template.module';


@NgModule({
  declarations: [
    CvFullComponent,
    CvSmallComponent,
    CvFormComponent,
    CvCreatePageComponent,
    CvLeftBarComponent,
    SkillDialog,
    LanguageDialog,
    EducationDialog,
    ExperienceDialog,
    CvEditPageComponent,
  ],
    imports: [
        CommonModule,
        // RouterModule,
        CvRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatDividerModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatOptionModule,
        MatAutocompleteModule,
        MatDialogModule,
        FontAwesomeModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CvTemplateModule,
    ]
})
export class CvModule {
}
