import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class UserValidators {
  static checkValidEndDateDialog(component: any): ValidatorFn {
    return (endDate: AbstractControl): ValidationErrors | null => {
      if (
        component.educationForm &&
        component.educationForm.controls &&
        component.educationForm.controls['startDate']?.value
      ) {
        const startDate = component.educationForm.controls['startDate']?.value;
        if (typeof endDate.value === 'string') {
          if (new Date(endDate.value) < new Date(startDate as string)) {
            return { incorrectDate: true };
          }
          return null;
        } else if (typeof endDate.value === 'object') {
          if (
            new Date(endDate.value.format()) < new Date(startDate as string)
          ) {
            return { badDate: true };
          }
          return null;
        }
      }
      return null;
    };
  }
  static checkValidEndDateExperience(component: any): ValidatorFn {
    return (endDate: AbstractControl): ValidationErrors | null => {
      if (
        component.experienceForm &&
        component.experienceForm.controls &&
        component.experienceForm.controls['startDate']?.value
      ) {
        const startDate = component.experienceForm.controls['startDate']?.value;
        if (typeof endDate.value === 'string') {
          if (new Date(endDate.value) < new Date(startDate as string)) {
            return { incorrectDate: true };
          }
          return null;
        } else if (typeof endDate.value === 'object') {
          if (
            new Date(endDate.value.format()) < new Date(startDate as string)
          ) {
            return { badDate: true };
          }
          return null;
        }
      }
      return null;
    };
  }

  static checkingNumberInPassword(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let Reg = new RegExp(reg);
      return Reg.test(control.value) ? null : { absentDigit: true };
    };
  }
  // ////////////////////////////////////////////////////////////

  static checkValidEndDateDialog1(startTime:any,endTime:any): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
       console.log('startDate', startTime)
       const startDate = new Date(controls?.get(startTime)?.value!).getTime()
       const endDate = new Date(controls?.get(endTime)?.value!).getTime()
    const error = {incorrectDate:true}

       if(!(endDate>=startDate)){
        controls.get(startTime)?.setErrors(error)
        // controls.get(endTime)?.setErrors(error)
        return {incorrectDate:true}
       }else{
        const firsFieldDate = controls.get(startTime)?.hasError('incorrectDate')
        if(firsFieldDate){
          if(controls&&controls.get(startTime)){
             delete controls.get(startTime)?.errors;
          }
        
        }
       }

        return null
  
    };
  }
}
