import { FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CvTemplateComponent} from './cv-template.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { SecondTemplateComponent } from './second-template/second-template.component';

@NgModule({
  declarations: [CvTemplateComponent, SecondTemplateComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [CvTemplateComponent, SecondTemplateComponent]
})
export class CvTemplateModule  { }
