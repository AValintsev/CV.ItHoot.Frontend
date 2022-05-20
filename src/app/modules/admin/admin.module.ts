import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminRouterModule} from './admin-routing.module';
import {CvModule} from "../cv/cv.module";

@NgModule({
	imports:[
		AdminRouterModule,
    CvModule,
		RouterModule
	],
	declarations: [],
	exports: [AdminRouterModule],

})

export class AdminModule{

}
