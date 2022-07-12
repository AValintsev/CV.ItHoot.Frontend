import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {ClientDto} from 'src/app/models/clients/client-dto';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientsService} from 'src/app/services/clients.service';

@Component({
  selector: 'client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
  styleUrls: ['./client-create-dialog.component.scss'],
})
export class ClientCreateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  client: ClientDto = {} as ClientDto;

  clientForm: UntypedFormGroup;

  isServerError: boolean = false;
  serverErrorMsg: string;

  ngOnInit() { }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ClientCreateDialogComponent>,
    public clientService: ClientsService,
  ) {
    this.client = data;
    this.clientForm = new UntypedFormGroup({
      "firstName": new UntypedFormControl("", Validators.required),
      "lastName": new UntypedFormControl("", Validators.required),
      "email": new UntypedFormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phoneNumber": new UntypedFormControl("", [Validators.pattern("^[0-9 ()+-]+"), Validators.minLength(7)]),
      "site": new UntypedFormControl(""),
      "contacts": new UntypedFormControl(),
      "companyName": new UntypedFormControl(),
    });
  }

  submit() {
    this.isServerError = false;

    this.client.firstName = this.clientForm.controls["firstName"].value;
    this.client.lastName = this.clientForm.controls["lastName"].value;
    this.client.email = this.clientForm.controls["email"].value;
    this.client.phoneNumber = this.clientForm.controls["phoneNumber"].value;
    this.client.site = this.clientForm.controls["site"].value;
    this.client.contacts = this.clientForm.controls["contacts"].value;
    this.client.companyName = this.clientForm.controls["companyName"].value;

    this.clientService.createClient(this.client).subscribe(
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
}
