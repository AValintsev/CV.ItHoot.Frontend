import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';

@NgModule({
	imports:[CommonModule,MaterialModule,MatButtonModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})

export class HeaderModule { }