import { ModalDeleteUserModule } from './../shared/modals/modal-delete-user/modal-delete-user.module';
import { HeaderModule } from './header/header.module';
import {FormBarComponent} from './form-bar/form-bar.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {ResumeViewPageComponent} from './resume-view-page/resume-view-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ResumeListPageComponent} from './resume-list-page/resume-list-page.component';
import {ResumeCreatePageComponent} from './resume-create-page/resume-create-page.component';
import {ResumeEditPageComponent} from './resume-edit-page/resume-edit-page.component';
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
import {ResumeBuilderEditorModule} from "../shared/resume-builder-editor/resume-builder-editor.module";
import {ResumeSettingDialogModule} from "../shared/resume/resume-setting-dialog/resume-setting-dialog.module";
import {ResumeCardComponent} from "./resume-card/resume-card.component";
import {MatMenuModule} from "@angular/material/menu";
import {SkillDialogModule} from "../shared/resume/skill-dialog/skill-dialog.module";
import {LanguageDialogModule} from "../shared/resume/language-dialog/language-dialog.module";
import {ExperienceDialogModule} from "../shared/resume/experience-dialog/experience-dialog.module";
import {EducationDialogModule} from "../shared/resume/education-dialog/education.dialog.module";
import {TemplatePreviewDialogModule} from "../shared/template-preview-dialog/template-preview-dialog.module";
import {MainPageComponent} from "./main-page/main-page.component";
import {UserSideBarComponent} from "./user-side-bar/user-side-bar.component";
import {LoaderModule} from "../shared/components/loader/loader.module";
import {BurgerBtnModule} from "../shared/buttons/burger-btn/burger-btn.module";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    ResumeViewPageComponent,
    ResumeCreatePageComponent,
    ResumeEditPageComponent,
    ResumeListPageComponent,
    MainPageComponent,
    UserSideBarComponent,
    FormBarComponent,
    ResumeCardComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatSelectModule,
    MatProgressSpinnerModule,
    ResumeTemplateBuilderModule,
    QuillModule,
    MatTooltipModule,
    ResumeBuilderEditorModule,
    ResumeSettingDialogModule,
    MatMenuModule,
    SkillDialogModule,
    LanguageDialogModule,
    ExperienceDialogModule,
    EducationDialogModule,
    TemplatePreviewDialogModule,
    LoaderModule,
    BurgerBtnModule,
    MatListModule,
    HeaderModule,
    ModalDeleteUserModule,

  ]
})
export class UserModule {}
