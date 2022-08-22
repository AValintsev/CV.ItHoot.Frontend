import { AbstractControl, FormControl, FormGroupDirective, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class UserValidators{
  static checkingNumberInPassword(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let Reg = new RegExp(reg);
      return Reg.test(control.value) ? null : { absentDigit: true };
    };
  }
  // ////////////////////////////////////////////////////////////

  static checkValidEndDateDialog(startTime: any, endTime: any): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const startDate = new Date(controls?.get(startTime)?.value!).getTime();
      const endDate = new Date(controls?.get(endTime)?.value!).getTime();
      const error = { incorrectDate: true };

      if (endDate < startDate) {
        controls.get(startTime)?.setErrors(error);
        return { incorrectDate: true };
      } else {
        const firsFieldDate = controls
          .get(startTime)
          ?.hasError('incorrectDate');
        if (firsFieldDate) {
          controls.get(startTime)?.updateValueAndValidity();
        }
      }

      return null;
    };
  }
}
