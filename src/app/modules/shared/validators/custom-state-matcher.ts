import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CustomStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      console.log(control?.value);
      
      return !!(control && control.invalid && control?.value && (control.touched || control.untouched || isSubmitted));
    //   return !!(control && control.invalid && (control.dirty &&(control.touched || control.untouched || isSubmitted)));
    // return true
    }
  }