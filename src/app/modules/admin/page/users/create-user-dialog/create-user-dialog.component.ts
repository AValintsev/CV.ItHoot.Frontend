import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UserService} from "../../../../../services/user.service";
import {UserProfileDto} from "../../../../../models/user-dto";


export interface ClientDtoExtendName extends UserProfileDto {
  name?:string
}

@Component({
  selector: 'create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  user:UserProfileDto = {} as UserProfileDto;

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
    public userService: UserService,
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
    this.user.firstName = this.clientForm.value?.name?.split(' ')[0];
    this.user.lastName = this.clientForm.value?.name?.split(' ')[1];
    this.userService.createUser(this.user).subscribe(

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