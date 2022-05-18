import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminRouterModule } from './admin-routing.module';

@NgModule({
	imports:[
		AdminRouterModule,
		RouterModule
	],
	declarations: [],
	exports: [AdminRouterModule],

})

export class AdminModule{

}