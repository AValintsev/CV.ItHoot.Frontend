import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


const routes: Routes = [
	{path:'',
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
