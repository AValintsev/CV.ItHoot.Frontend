import { AfterViewInit, ElementRef, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvTemplateComponent } from './cv-template.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { jsPDF } from "jspdf";

@NgModule({
  declarations: [CvTemplateComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  exports: [CvTemplateComponent]
})
export class CvTemplateModule  { }
