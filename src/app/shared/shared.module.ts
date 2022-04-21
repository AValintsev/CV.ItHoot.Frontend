import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CvButtonComponent } from './cv-button/cv-button.component';
import { MaterialModule} from '../material/material.module';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    CvButtonComponent,
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MaterialModule,
    AngularEditorModule,
    HttpClientModule
  ],
  exports: [
    TextEditorComponent,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    CvButtonComponent,
    MaterialModule,
    AngularEditorModule,
    HttpClientModule
  ]
})
export class SharedModule { }
