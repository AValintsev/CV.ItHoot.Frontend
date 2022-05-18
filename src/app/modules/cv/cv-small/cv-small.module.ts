import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from './../../material/material.module';
import { CommonModule } from '@angular/common';
import { CvSmallComponent } from './cv-small.component';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [CvSmallComponent],
	imports: [
		CommonModule,
		MaterialModule,
		MatCardModule,
		RouterModule,
	],
	exports: [CvSmallComponent],
})

export class CvSmallModule { }