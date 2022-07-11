import {DeleteModalService} from './../../../../services/delete-modal.service';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainPageRoutingModule} from './main-page-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MainPageRoutingModule,MatDialogModule],
  exports: [],
  providers:[

    DeleteModalService]
})
export class MainPageModule {}
