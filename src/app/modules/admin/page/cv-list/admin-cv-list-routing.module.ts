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

const routes: Routes = [
	{
		path: '',
		component: AdminCvListComponent
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
