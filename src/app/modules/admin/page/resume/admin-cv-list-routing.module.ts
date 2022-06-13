import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {AdminCvListComponent} from './admin-cv-list/admin-cv-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { CreatePageComponent } from '../create-page/create-page.component';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { CvFullComponent } from '../cv-full/cv-full.component';

const routes: Routes = [
	{
		path: '',
		component: AdminCvListComponent,
	},
  {
    path: 'edit/:id',
	  component: EditPageComponent,
  },
  {
    path: 'create',
	  component: CreatePageComponent
  },
  {
    path:':id',
    component:CvFullComponent
  },

];

@NgModule({
	declarations:[AdminCvListComponent],
	imports: [
		CommonModule,
		MatIconModule,
		MatDividerModule,
		MatExpansionModule,
		MatTableModule,
		MatButtonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminCvListRouterModule { }
