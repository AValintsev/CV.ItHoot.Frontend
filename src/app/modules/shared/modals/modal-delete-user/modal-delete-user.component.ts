import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'cv-modal-delete-user',
  templateUrl: './modal-delete-user.component.html',
  styleUrls: ['./modal-delete-user.component.scss'],
  providers:[


  ]
})
export class ModalDeleteComponent implements OnInit {
qqq =''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:{title:string},
  ) { }

  ngOnInit(): void {
    this.qqq = this.data.title
  }

}
