import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
	imports:[CommonModule,MatButtonModule,RouterModule,MatTooltipModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})

export class HeaderModule { }
