import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientsService} from 'src/app/services/clients.service';
import {ClientDtoExtendName} from '../client-create-dialog/client-create-dialog.component';

@Component({
  selector: 'client-update-dialog',
  templateUrl: './client-update-dialog.component.html',
  styleUrls: ['./client-update-dialog.component.scss'],
})
export class ClientUpdateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  client: ClientDtoExtendName = {} as ClientDtoExtendName;

  clientForm: UntypedFormGroup;
  isServerError: boolean = false;
  serverErrorMsg: string;

  ngOnInit() { }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ClientUpdateDialogComponent>,
    public clientService: ClientsService,
  ) {
    this.client = data;
    this.clientForm = new UntypedFormGroup({
      "id": new UntypedFormControl(this.client.id, Validators.required),
      "name": new UntypedFormControl(this.client.firstName + ' ' + this.client.lastName, Validators.required),
      "email": new UntypedFormControl({ value: this.client.email, disabled: true }, [
        Validators.required,
        Validators.email
      ]),
      "phoneNumber": new UntypedFormControl(this.client.phoneNumber, [Validators.pattern("^[0-9 ()+-]+"), Validators.minLength(7)]),
      "site": new UntypedFormControl(this.client.site),
      "contacts": new UntypedFormControl(this.client.contacts),
      "companyName": new UntypedFormControl(this.client.companyName),
    });
  }

  submit() {

    this.isServerError = false;

    const [firstName,lastName='']=this.clientForm.controls['name'].value.split(' ')

    this.client = ({...this.clientForm.value,firstName,lastName});

    delete this.client.name;

    this.clientService.updateClient(this.client).subscribe(
      (data) => {
        this.dialogRef.close(data);
      },
      err => {
        this.isServerError = true;
        this.serverErrorMsg = err.error.message;
        console.warn(err);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  getEmailValidationError() {
    if (this.clientForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.clientForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
}
