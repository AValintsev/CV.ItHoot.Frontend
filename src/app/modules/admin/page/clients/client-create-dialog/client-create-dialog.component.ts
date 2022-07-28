import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {ClientDto} from 'src/app/models/clients/client-dto';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientsService} from 'src/app/services/clients.service';

export interface ClientDtoExtendName extends ClientDto {
  name?:string
} 

@Component({
  selector: 'client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
  styleUrls: ['./client-create-dialog.component.scss'],
})
export class ClientCreateDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  client:ClientDtoExtendName = {} as ClientDtoExtendName;

  clientForm: UntypedFormGroup;

  isServerError: boolean = false;
  serverErrorMsg: string;

  ngOnInit() {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientCreateDialogComponent>,
    public clientService: ClientsService,
  ) {
    this.client = data;
    this.clientForm = new UntypedFormGroup({
      "name": new UntypedFormControl("", Validators.required),
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
     const [firstName,lastName='']=this.clientForm.controls['name'].value.split(' ')

    this.client = ({...this.clientForm.value,firstName,lastName});

    delete this.client.name;
    
    this.clientService.createClient(this.client).subscribe(

      (client) => this.dialogRef.close(client),
      (error) => {
        this.isServerError = true;
        this.serverErrorMsg = error.error.message;
        console.warn(error);
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

  onCancelClick() {
    this.dialogRef.close(null);
  }
}
