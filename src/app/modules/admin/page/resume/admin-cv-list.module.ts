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
import {AdminCvListRouterModule} from './admin-cv-list-routing.module';
import {CommonModule} from "@angular/common";
import {EditPageComponent} from '../edit-page/edit-page.component';
import {CreatePageComponent} from '../create-page/create-page.component';
import {SkillDialog} from '../../component/modals/skill-dialog/skill-dialog.component';
import {ExperienceDialog} from '../../component/modals/experience-dialog/experience-dialog.component';
import {EducationDialog} from '../../component/modals/education-dialog/education-dialog.component';
import {LanguageDialog} from '../../component/modals/language-dialog/language-dialog.component';
import {CvFullComponent} from '../cv-full/cv-full.component';
import {ResumeListPageComponent} from './page/resume-list-page/resume-list-page.component';
import {AdminCvListComponent} from './admin-cv-list/admin-cv-list.component';
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
import {FormBarModule} from '../form-bar/form-bar.module';
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxSpinnerModule} from "ngx-spinner";
import {TemplatePreviewDialogAdminComponent} from './template-preview-dialog/template-preview-dialog-admin.component';
import { LoaderModule } from 'src/app/modules/shared/components/loader/loader.module';
import {ResumeBuilderEditorModule} from "../../../shared/resume-builder-editor/resume-builder-editor.module";


@NgModule({

    imports: [
        ResumeTemplateBuilderModule,
        TemplateBuilderModule,
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
    ],

  exports: [
    AdminCvListComponent,
  ],
  declarations: [
    EditPageComponent,
    CreatePageComponent,
    SkillDialog,
    LanguageDialog,
    ExperienceDialog,
    EducationDialog,
    CvFullComponent,
    AdminCvListComponent,
    ResumeListPageComponent,
    TemplatePreviewDialogAdminComponent,
  ],
  providers: [DeleteModalService]
})

export class AdminCvListModule {
}
