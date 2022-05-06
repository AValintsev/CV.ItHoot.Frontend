import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CvRoutingModule } from './cv-routing.module';
import { CvFormComponent } from './cv-form/cv-form.component';
import { CvEditComponent } from './cv-edit/cv-edit.component';
import { CvListComponent } from './cv-list/cv-list.component';
import { CvFullComponent } from './cv-full/cv-full.component';
import { CvSmallComponent } from './cv-small/cv-small.component';
import { CvCreateComponent } from './cv-create/cv-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CvTestComponent } from './cv-test/cv-test.component';
import { SkillComponent } from './haredCv/skill/skill.component';
import { ChangeLanguageForHrComponent } from './shared/change-language-for-hr/change-language-for-hr.component';
import { ChangeExperiencesForHRComponent } from './shared/change-experiences-for-hr/change-experiences-for-hr.component';
import { ChangeEducationsForHRComponent } from './shared/change-educations-for-hr/change-educations-for-hr.component';
import { ChangeSkillsForHrComponent } from './shared/change-skills-for-hr/change-skills-for-hr.component';
import { ChangePersonalDataForHRComponent } from './shared/change-personal-data-for-hr/change-personal-data-for-hr.component';
import {SharedModule} from "../../shared/shared.module";
import { CvCreatePageComponent } from './cv-create-page/cv-create-page.component';
import { CvCreateLeftBarComponent } from './cv-create-leftbar/cv-create-left-bar.component';


@NgModule({
  declarations: [
    CvEditComponent,
    CvFullComponent,
    CvListComponent,
    CvSmallComponent,
    CvCreateComponent,
    CvFormComponent,
    CvTestComponent,
    SkillComponent,
    ChangeLanguageForHrComponent,
    ChangeExperiencesForHRComponent,
    ChangeEducationsForHRComponent,
    ChangeSkillsForHrComponent,
    ChangePersonalDataForHRComponent,
    CvCreatePageComponent,
    CvCreateLeftBarComponent,

  ],
  imports: [
    CommonModule,
    // RouterModule,
    SharedModule,
    CvRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,

  ]
})
export class CvModule { }
