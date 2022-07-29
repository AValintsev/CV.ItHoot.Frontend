import { FormBarComponent } from './form-bar/form-bar.component';
import {CvSmallModule} from './cv-small/cv-small.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CvRoutingModule} from './cv-routing.module';
import {CvFullComponent} from './cv-full/cv-full.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCvListComponent} from './user-cv-list/user-cv-list.component';
import {CvCreatePageComponent} from './cv-create-page/cv-create-page.component';
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
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {ResumeTemplateBuilderModule} from "../shared/resume-template-builder/resume-template-builder.module";
import {QuillModule} from "ngx-quill";
import {MatTooltipModule} from "@angular/material/tooltip";
import { TemplatePreviewDialogComponent } from './template-preview-dialog/template-preview-dialog.component';



@NgModule({
  declarations: [
    CvFullComponent,
    CvCreatePageComponent,
    SkillDialog,
    LanguageDialog,
    EducationDialog,
    ExperienceDialog,
    CvEditPageComponent,
    UserCvListComponent,
    FormBarComponent,
    TemplatePreviewDialogComponent

  ],
    imports: [
        CommonModule,
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
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        CvSmallModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        ResumeTemplateBuilderModule,
        QuillModule,
        MatTooltipModule
    ]
})
export class CvModule {
}
