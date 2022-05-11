import {FooterComponent} from './../core/footer/footer.component';
import {HeaderComponent} from './../core/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {AuthBarComponent} from '../core/auth-bar/auth-bar.component';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = [
	{
		path: '', component: MainPageComponent, children: [
			{
				path: 'cv', loadChildren: () => import('./../cv/cv.module').then(mod => mod.CvModule),
			},
			{
				path: 'editor', loadChildren: () => import('./../cv-editor/cv-editor.module').then(mod => mod.CvEditorModule)
			},
		]
	}

	// {
	//   path: '', redirectTo: 'cv', pathMatch: 'full'
	// }


]

@NgModule({
	imports: [
		CommonModule, 
		MatButtonModule,
		RouterModule.forChild(routes)],
	exports: [RouterModule],
	declarations: [HeaderComponent, FooterComponent, MainPageComponent, AuthBarComponent]
})

export class MainPageRoutingModule { }
