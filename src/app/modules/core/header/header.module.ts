import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';

@NgModule({
	imports:[CommonModule,MatButtonModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})

export class HeaderModule { }
