import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cv-modal-delete-user',
  templateUrl: './modal-delete-user.component.html',
  styleUrls: ['./modal-delete-user.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title:string}) {}

  ngOnInit(): void {
  }

}


