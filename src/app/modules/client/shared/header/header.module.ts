import { MatIconModule } from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HeaderComponent} from './header.component';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
	imports:[
		CommonModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		MatMenuModule,
		MatIconModule
	],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})

export class HeaderModule { }
