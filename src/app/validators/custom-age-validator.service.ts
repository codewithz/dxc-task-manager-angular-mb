import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomAgeValidatorService {

  constructor() { }

  minimumAgeValidator(minimumAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // Date of Birth is Null
      }

      let today = new Date();
      let dateOfBirth = new Date(control.value);
      const differenceInMilliSeconds = Math.abs(today.getTime() - dateOfBirth.getTime());
      const differenceInYears = (differenceInMilliSeconds / (1000 * 60 * 60 * 24)) / 365.25;
      if (differenceInYears >= minimumAge) {
        return null; // Valid
      }
      else {
        return { minAge: { valid: false } } //Invalid
      }
    }
  }

  comparePasswordValidator(controlToValidate: string, controlToCompare: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (!(formGroup.get(controlToValidate) as FormControl).value) {
        return null; // return null, Confirm Password is null
      }

      if ((formGroup.get(controlToValidate) as FormControl).value
        ==
        (formGroup.get(controlToCompare) as FormControl).value) {
        return null; // Valid
      }
      else {
        (formGroup.get(controlToValidate) as FormControl).setErrors({
          comparePasswordValidator: { valid: false }
        });

        return { comparePasswordValidator: { valid: false } }// Invalid
      }
    }
  }
}
