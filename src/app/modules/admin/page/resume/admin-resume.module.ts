import {MatMenuModule} from '@angular/material/menu';
import {DirectivesModule} from '../../../shared/directives/directives.module';
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
import {AdminResumeRouterModule} from './admin-resume-routing.module';
import {CommonModule} from "@angular/common";
import {ResumeEditPage} from './page/resume-edit-page/edit-page.component';
import {ResumeCreatePage} from './page/resume-create-page/resume-create-page.component';
import {ResumeViewPage} from './page/resume-view-page/resume-view-page.component';
import {ResumeListPage} from './page/resume-list-page/resume-list-page.component';
import {AdminCvListComponent} from './components/admin-cv-list/admin-cv-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {PdfFooterModule} from "../../../shared/pdf-footer/pdf-footer.module";
import {ResumeTemplateBuilderModule} from "../../../shared/resume-template-builder/resume-template-builder.module";
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {QuillModule} from "ngx-quill";
import {TemplateBuilderModule} from 'src/app/modules/shared/template-builder/template-builder.module';
import {FormBarModule} from './components/form-bar/form-bar.module';
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxSpinnerModule} from "ngx-spinner";
import {LoaderModule} from 'src/app/modules/shared/components/loader/loader.module';
import {ResumeBuilderEditorModule} from "../../../shared/resume-builder-editor/resume-builder-editor.module";
import {ResumeSettingDialogModule} from "../../../shared/resume/resume-setting-dialog/resume-setting-dialog.module";
import {SkillDialogModule} from "../../../shared/resume/skill-dialog/skill-dialog.module";
import {LanguageDialogModule} from "../../../shared/resume/language-dialog/language-dialog.module";
import {ExperienceDialogModule} from "../../../shared/resume/experience-dialog/experience-dialog.module";
import {EducationDialogModule} from "../../../shared/resume/education-dialog/education.dialog.module";
import {TemplatePreviewDialogModule} from "../../../shared/template-preview-dialog/template-preview-dialog.module";
import { ResumeHistoryDialog } from './components/resume-history-dialog/resume-history-dialog.component';
import {PipesModule} from "../../../shared/directives/pipes.module";


@NgModule({

  imports: [
    ResumeTemplateBuilderModule,
    TemplateBuilderModule,
    AdminResumeRouterModule,
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
    MatCardModule,
    DirectivesModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxMatSelectSearchModule,
    PdfFooterModule,
    MatMenuModule,
    FormBarModule,
    QuillModule.forRoot(),
    MatTooltipModule,
    NgxSpinnerModule,
    LoaderModule,
    ResumeBuilderEditorModule,
    ResumeSettingDialogModule,
    SkillDialogModule,
    LanguageDialogModule,
    ExperienceDialogModule,
    EducationDialogModule,
    TemplatePreviewDialogModule,
    PipesModule
  ],

  exports: [
    AdminCvListComponent,
  ],
  declarations: [
    ResumeEditPage,
    ResumeCreatePage,
    ResumeViewPage,
    AdminCvListComponent,
    ResumeListPage,
    ResumeHistoryDialog,
  ],
  providers: [DeleteModalService]
})

export class AdminResumeModule {
}
