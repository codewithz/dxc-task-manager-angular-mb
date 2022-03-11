import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../countries/country';
import { CountriesService } from './../countries/countries.service';
import { CustomAgeValidatorService } from './../validators/custom-age-validator.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup | any;

  genders = ['male', 'female']

  countries: Country[] = [];

  constructor(private countriesService: CountriesService, private customAgeValidator: CustomAgeValidatorService) { }

  ngOnInit(): void {

    this.countriesService.getCountries()
      .subscribe(
        (response) => {
          this.countries = response;
          console.log(this.countries)
        }
      )

    this.signUpForm = new FormGroup({
      personalDetails: new FormGroup({
        firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      }),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
      dateOfBirth: new FormControl(null,
        [Validators.required,
        this.customAgeValidator.minimumAgeValidator(18)]),
      gender: new FormControl(null, [Validators.required]),
      countryID: new FormControl(null, [Validators.required]),
      receiveNewsLetter: new FormControl(null),
      skills: new FormArray([])
    })

    this.signUpForm.valueChanges.
      subscribe((value: any) => {
        console.log(value)
      })
  }

  onSubmitClicked() {

    // this.signUpForm.value.personalDetails.setValues({
    //   firstName: 'Test',
    //   lastName: 'Test'
    // })
    //Set Value
    // this.signUpForm.setValue(
    //   {

    //     firstName: 'Zartab',
    //     lastName: 'Nakhwa',
    //     email: 'zartab@codewithz.com',
    //     mobile: 'Some Number',
    //     dateOfBirth: '1990-12-13',
    //     gender: 'male',
    //     countryID: 300,
    //     receiveNewsLetter: true
    //   }
    // )

    // Patch Value 
    // this.signUpForm.patchValue(
    //   {

    //     firstName: 'Zartab',
    //     lastName: 'Nakhwa',
    //     email: 'zartab@codewithz.com',
    //     mobile: 'Some Number',

    //   }
    // )

    //Reset 
    this.signUpForm.reset();
  }

  onAddSkill() {
    let skillFormGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
    })

    let skillsFormArray =
      <FormArray>this.signUpForm.get('skills');

    skillsFormArray.push(skillFormGroup);
  }

  onRemoveCLick(index: number) {
    let skillsFormArray =
      <FormArray>this.signUpForm.get('skills');

    skillsFormArray.removeAt(index)

  }

}
