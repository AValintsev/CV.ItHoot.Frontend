import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteUserComponent } from './modal-delete-user.component';



@NgModule({
  declarations: [ModalDeleteUserComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ModalDeleteUserComponent]
})
export class ModalDeleteUserModule { }
