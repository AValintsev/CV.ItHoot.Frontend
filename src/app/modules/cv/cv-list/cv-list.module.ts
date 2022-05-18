import { CvSmallModule } from './../cv-small/cv-small.module';
import { CvListComponent } from './cv-list.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [CvListComponent],
	imports:[
		CommonModule,
		MaterialModule,
		MatCardModule,
		RouterModule,
		CvSmallModule,
	],
	exports: [CvListComponent],
})

export class CvListModule{}