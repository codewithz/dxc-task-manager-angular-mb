import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, FormControl, AsyncValidatorFn } from '@angular/forms';
import { LoginService } from './../login/login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomAgeValidatorService {

  constructor(private loginService: LoginService) { }

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

  duplicateEmailValidator(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.loginService.getUserByEmail(control.value)
        .pipe(
          map(
            (existingUser: any) => {
              if (existingUser != null) {
                control.setErrors({
                  uniqueEmail: { valid: false }
                });
                return { uniqueEmail: { valid: false } }
              }
              else {
                return null;
              }
            }
          )
        )
    }

  }
}
