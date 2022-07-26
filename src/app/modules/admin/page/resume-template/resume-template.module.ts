import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { ResumeTemplateRoutingModule } from './resume-template-routing.module';
import { RouterModule } from '@angular/router';
import { ResumeTemplateListPageComponent } from './resume-template-list-page/resume-template-list-page.component';
import { ResumeTemplatePageComponent } from './resume-template-page/resume-template-page.component';
import { ResumeTemplateEditPageComponent } from './resume-template-edit-page/resume-template-edit-page.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ResumeTemplateCreatePageComponent } from './resume-template-create-page/resume-template-create-page.component';
import { MatIconModule } from '@angular/material/icon';
import { TemplateBuilderModule } from '../../../shared/template-builder/template-builder.module';
import { PreviewDialogComponent } from './preview-dialog/preview-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ResumeTemplateBuilderModule } from '../../../shared/resume-template-builder/resume-template-builder.module';

@NgModule({
  imports: [
    RouterModule,
    ResumeTemplateRoutingModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MonacoEditorModule,
    MatIconModule,
    TemplateBuilderModule,
    ReactiveFormsModule,
    MatDialogModule,
    ResumeTemplateBuilderModule,
    MatMenuModule,
  ],
  exports: [],
  declarations: [
    ResumeTemplateListPageComponent,
    ResumeTemplatePageComponent,
    ResumeTemplateEditPageComponent,
    ResumeTemplateCreatePageComponent,
    PreviewDialogComponent,
  ],
})
export class ResumeTemplateModule {}
