import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {ClientDto} from 'src/app/models/clients/client-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientsService} from 'src/app/services/clients.service';

@Component({
  selector: 'client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
  styleUrls: ['./client-create-dialog.component.scss'],
})
export class ClientCreateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  client: ClientDto = {} as ClientDto;

  clientForm: FormGroup;

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
    this.clientForm = new FormGroup({
      "firstName": new FormControl("", Validators.required),
      "lastName": new FormControl("", Validators.required),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phoneNumber": new FormControl("", [Validators.pattern("^[0-9 ()+-]+"), Validators.minLength(7)]),
      "site": new FormControl("", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")),
      "contacts": new FormControl(),
      "companyName": new FormControl(),
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
