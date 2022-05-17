import {WrapperCvSectionComponent} from './component/wrapper-cv-section/wrapper-cv-section.component';
import {EducationComponent} from './component/education/education.component';
import {LanguageComponent} from './component/language/language.component';
import {PersonalDataComponent} from './component/personal-data/personal-data.component'
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from './editor.component';
import {ExperienceComponent} from './component/experience/experience.component';
import {AboutMeComponent} from './component/about-me/about-me.component';
import {SvEditorRoutingModule} from './sv-editor-routing.module';
import {SkillComponent} from './component/skill/skill.component'
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    EditorComponent,
    ExperienceComponent,
    AboutMeComponent,
    PersonalDataComponent,
    LanguageComponent,
    EducationComponent,
    WrapperCvSectionComponent,
    SkillComponent,
  ],
  imports: [
    CommonModule,
    SvEditorRoutingModule,
    SharedModule
  ]
})
export class CvEditorModule { }
