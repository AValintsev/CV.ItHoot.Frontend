import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from './../../core/header/header.module';
import { FooterModule } from './../../core/footer/footer.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalService } from 'src/app/services/delete-modal.service';
import { UserHeaderBtnService } from 'src/app/services/user-header-btn.service';
import { MainPageRoutingModule } from './main-page-routing.module';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { CvCideBarComponent } from '../cv-cide-bar/cv-cide-bar.component';
import { MainPageComponent } from './main-page.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [MainPageComponent, CvCideBarComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatButtonModule,
    FooterModule,
    HeaderModule,
    LoaderModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
  ],
  exports: [],
  providers: [UserHeaderBtnService, DeleteModalService],
})
export class MainPageModule {}
