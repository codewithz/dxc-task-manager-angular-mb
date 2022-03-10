import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ClientLocationStatusValidatorDirective,
    multi: true
  }]
})
export class ClientLocationStatusValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log("CL:", control.value.clientLocation, '||', control.value.radioStatus)
    let isValid = true;
    if (control.value.clientLocation == 3 && control.value.radioStatus.trim() == 'Support') {
      isValid = false;
    }
    console.log("Is Valid:", isValid)

    if (isValid == true) {
      return null;
    }
    else {
      return { clientLocationStatus: { valid: false } }
    }
  }

}
