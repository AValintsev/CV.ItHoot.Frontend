import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AdminCvListComponent } from './admin-cv-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import {CvEditPageComponent} from "../../../cv/cv-edit-page/cv-edit-page.component";
import {CvCreatePageComponent} from "../../../cv/cv-create-page/cv-create-page.component";
import {CvFullComponent} from "../../../cv/cv-full/cv-full.component";

const routes: Routes = [
	{
		path: '',
		component: AdminCvListComponent,
	},
  {
    path: 'edit/:id',
    component: CvEditPageComponent,
  },
  {
    path: 'create',
    component:CvCreatePageComponent
  },
  {
    path:':id',
    component:CvFullComponent
  }

];

@NgModule({
	declarations:[AdminCvListComponent],
	imports: [
		CommonModule,
		MaterialModule,
		MatIconModule,
		MatDividerModule,
		MatExpansionModule,
		MatTableModule,
		MatButtonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminCvListRouterModule { }
