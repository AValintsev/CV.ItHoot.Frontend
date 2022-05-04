import { FooterComponent } from './../core/footer/footer.component';
import { HeaderComponent } from './../core/header/header.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { AuthBarComponent } from '../core/auth-bar/auth-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule,RouterModule.forChild([
		{ path: '', component: MainPageComponent,children:[
			{
			path: 'cv', loadChildren: () => import('./../cv/cv.module').then(mod => mod.CvModule),
		},
		{
			path: 'editor', loadChildren: () => import('./../cv-editor/cv-editor.module').then(mod => mod.CvEditorModule)
		},
		]}
		
		// {
		//   path: '', redirectTo: 'cv', pathMatch: 'full'
		// }


	])],
	exports: [RouterModule],
	declarations: [HeaderComponent, FooterComponent, MainPageComponent, AuthBarComponent]
})

export class MainPageRoutingModule { }