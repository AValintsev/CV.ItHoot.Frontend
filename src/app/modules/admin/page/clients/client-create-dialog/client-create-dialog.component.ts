import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ClientDto } from 'src/app/models/clients/client-dto';

@Component({
  selector: 'client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
  styleUrls: ['./client-create-dialog.component.scss'],
})
export class ClientCreateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  client: ClientDto = {} as ClientDto;

  ngOnInit() { }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ClientCreateDialogComponent>
  ) {
    this.client = data;
  }

  canCreate(): boolean {
    return !this.client.firstName || !this.client.email;
  }

  click() {
    this.dialogRef.close(this.client);
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
