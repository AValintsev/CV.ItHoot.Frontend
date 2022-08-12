import {FormBarComponent} from './form-bar.component';
import {NgxLoadingButtonsModule} from 'ngx-loading-buttons';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';

import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {NgModule} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {QuillModule} from 'ngx-quill';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DirectivesModule} from "../../../../../shared/directives/directives.module";


@NgModule({
  declarations: [FormBarComponent],
    imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatTableModule,
        MatCheckboxModule,
        NgxLoadingButtonsModule,
        MatTooltipModule,
        MatMenuModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatDialogModule,
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        QuillModule.forRoot(),
        DirectivesModule
    ],
  exports:[FormBarComponent]
})
export class FormBarModule { }
