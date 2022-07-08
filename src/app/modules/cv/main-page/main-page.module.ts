import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { DeleteModalService } from 'src/app/services/delete-modal.service';
import { UserHeaderBtnService } from 'src/app/services/user-header-btn.service';
import {MainPageRoutingModule} from './main-page-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainPageRoutingModule],
  exports: [],
  providers:[
    UserHeaderBtnService,
  ]
})
export class MainPageModule {}
