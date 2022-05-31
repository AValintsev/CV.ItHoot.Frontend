import { HeaderComponent } from './header.component';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
	imports:[CommonModule,MatButtonModule,RouterModule],
	declarations: [HeaderComponent],
	exports: [HeaderComponent]
})

export class HeaderModule { }
