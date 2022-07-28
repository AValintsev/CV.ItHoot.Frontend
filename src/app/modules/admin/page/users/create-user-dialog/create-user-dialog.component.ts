import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {catchError, map, of, Subject} from 'rxjs';
import {ClientDto} from 'src/app/models/clients/client-dto';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientsService} from 'src/app/services/clients.service';
import { ClientsListFilter } from 'src/app/models/clients/clients-list-filter';


export interface ClientDtoExtendName extends ClientDto {
  name?:string
} 

@Component({
  selector: 'create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  user:ClientDtoExtendName = {} as ClientDtoExtendName;

  clientForm: UntypedFormGroup;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  isServerError: boolean = false;
  serverErrorMsg: string;

  ngOnInit() {
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    public clientService: ClientsService,
  ) {
    this.user = data;
    this.clientForm = new UntypedFormGroup({
      "name": new UntypedFormControl("", Validators.required),
      "email": new UntypedFormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new UntypedFormControl('',[Validators.required,Validators.minLength(6)]),
    });
  }

  submit() {
    this.isServerError = false;
    this.user = this.clientForm.value
    // this.clientService.createClient(this.user).subscribe(

    //   (client) => this.dialogRef.close(client),
    //   (error) => {
    //     this.isServerError = true;
    //     this.serverErrorMsg = error.error.message;
    //     console.warn(error);
    //   });
console.log(this.user)
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
