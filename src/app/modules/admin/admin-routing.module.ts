import { MaterialModule } from './../material/material.module';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { FooterModule } from '../core/footer/footer.module';
import { HeaderModule } from '../core/header/header.module';


const routs: Routes = [
	{
		path: '', component: AdminLayoutComponent, children: [
			{
				path: 'cv',
				loadChildren: () => import('./page/cv-list/admin-cv-list.module').then(mod => mod.AdminCvListModule)
			},
			{
				path: 'languages',
				loadChildren: () => import('./page/language/language.module').then(mod => mod.LanguageModule)
			},
			{
				path: 'skills',
				loadChildren: () => import('./page/skill/skill.module').then(mod => mod.SkillModule)
			},
			{
				path: '',
				redirectTo: 'cv-list',
				pathMatch: 'full'
			}
		]
	}

]

@NgModule({
	imports: [
		
		CommonModule,
		MaterialModule,
		MatIconModule,
		MatDividerModule,
		MatExpansionModule,
		MatTableModule,
		FooterModule,
		HeaderModule,
		RouterModule.forChild(routs),
	],
	declarations: [AdminLayoutComponent, SideBarComponent],
	exports: [AdminLayoutComponent, SideBarComponent],

})

export class AdminRouterModule {

}