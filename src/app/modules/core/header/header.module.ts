import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	imports:[CommonModule,MatButtonModule,RouterModule,MatTooltipModule,MatMenuModule,MatIconModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})

export class HeaderModule { }
