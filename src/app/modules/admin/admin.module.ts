import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminRouterModule} from './admin-routing.module';
import {CvModule} from "../cv/cv.module";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {FooterModule} from "../core/footer/footer.module";
import {HeaderModule} from "../core/header/header.module";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {SideBarComponent} from "./component/side-bar/side-bar.component";

@NgModule({
	imports:[
		AdminRouterModule,
    CvModule,
		RouterModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    FooterModule,
    HeaderModule,
	],
	declarations: [AdminLayoutComponent,SideBarComponent],
	exports: [AdminRouterModule,AdminLayoutComponent,SideBarComponent],
})

export class AdminModule{

}
