import { AuthBarComponent } from './../core/auth-bar/auth-bar.component';
import { FooterComponent } from './../core/footer/footer.component';
import { HeaderComponent } from './../core/header/header.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';


@NgModule({
	declarations: [],
	imports: [CommonModule, MainPageRoutingModule],
	exports: []
})

export class MainPageModule {

}