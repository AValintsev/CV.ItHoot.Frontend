import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {AdminCvListComponent} from './admin-cv-list/admin-cv-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import { CreatePageComponent } from '../create-page/create-page.component';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { CvFullComponent } from '../cv-full/cv-full.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {CreatePageComponent} from '../create-page/create-page.component';
import {EditPageComponent} from '../edit-page/edit-page.component';
import {CvFullComponent} from '../cv-full/cv-full.component';

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
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDividerModule,
		MatExpansionModule,
		MatTableModule,
		MatButtonModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatSelectModule,
		MatFormFieldModule,
		NgxMatSelectSearchModule,
		MatInputModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminCvListRouterModule { }
