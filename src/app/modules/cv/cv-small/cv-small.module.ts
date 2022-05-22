import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
		MatCardModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule
	],
	exports: [CvSmallComponent],
})

export class CvSmallModule { }