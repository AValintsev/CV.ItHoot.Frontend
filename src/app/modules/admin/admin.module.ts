import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdminRouterModule} from './admin-routing.module';
import {UserModule} from "../user/user.module";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {AdminSideBarComponent} from "./component/side-bar/admin-side-bar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {BurgerBtnModule} from '../shared/buttons/burger-btn/burger-btn.module';

@NgModule({
    imports: [
        AdminRouterModule,
        UserModule,
        RouterModule,
        CommonModule,
        MatIconModule,
        MatDividerModule,
        MatExpansionModule,
        MatTableModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatTooltipModule,
        BurgerBtnModule,
    ],
	declarations: [AdminLayoutComponent,AdminSideBarComponent],
	exports: [AdminRouterModule,AdminLayoutComponent,AdminSideBarComponent],
})

export class AdminModule{

}
