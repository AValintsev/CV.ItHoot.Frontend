import { CvSmallModule } from './../cv-small/cv-small.module';
import { CvListComponent } from './cv-list.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
	{path:'',component:CvListComponent}
]

@NgModule({
	declarations: [CvListComponent,],
	imports:[
		CommonModule,
		MatCardModule,
		RouterModule.forChild(routes),
		CvSmallModule,
	],
	exports: [CvListComponent],
})

export class CvListModule{}