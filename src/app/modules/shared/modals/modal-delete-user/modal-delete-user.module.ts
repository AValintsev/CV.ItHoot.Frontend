import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalDeleteComponent} from './modal-delete-user.component';


@NgModule({
  declarations: [ModalDeleteComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ModalDeleteComponent]
})
export class ModalDeleteUserModule { }
