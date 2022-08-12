import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';
import {MainPageRoutingModule} from './main-page-routing.module';
import {LoaderModule} from '../../shared/components/loader/loader.module';
import {UserSideBarComponent} from '../side-bar/user-side-bar.component';
import {MainPageComponent} from './main-page.component';
import {MatListModule} from '@angular/material/list';
import {DirectivesModule} from '../../shared/directives/directives.module';
import {MatTooltipModule} from "@angular/material/tooltip";
import {BurgerBtnModule} from '../../shared/buttons/burger-btn/burger-btn.module';

@NgModule({
  declarations: [MainPageComponent, UserSideBarComponent],
    imports: [
        CommonModule,
        MainPageRoutingModule,
        MatButtonModule,
        LoaderModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatDividerModule,
        DirectivesModule,
        MatTooltipModule,
        BurgerBtnModule
    ],
  exports: [UserSideBarComponent],
  providers: [UserHeaderBtnService, DeleteModalService],
})
export class MainPageModule {}
