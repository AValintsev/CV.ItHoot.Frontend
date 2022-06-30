import {AdminCvListComponent} from './admin-cv-list/admin-cv-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CreatePageComponent } from '../create-page/create-page.component';
import { EditPageComponent } from '../edit-page/edit-page.component';
import { CvFullComponent } from '../cv-full/cv-full.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {DirectivesModule} from "../../../shared/directives/directives.module";


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
	declarations:[],
	imports: [
    CommonModule,
    RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminCvListRouterModule { }
