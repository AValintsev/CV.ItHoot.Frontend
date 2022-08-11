import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersGuard} from 'src/app/guards/users.guard';
import {Users} from 'src/app/models/users-type';


const routes: Routes = [
	{path:'',
	canLoad:[UsersGuard],
	canActivateChild: [UsersGuard],
	data: {
	  role: [Users[3]]
	},
	loadChildren:()=>import('./page/main-page/main-page.module').then(m=>m.MainPageModule)}
]

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		RouterModule.forChild(routes)],
	exports: [],
})

export class ClientRoutingModule {

}
