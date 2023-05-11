import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { UniqueUsernameValidator } from "./uniqueUsernameValidator.service";
import { Directive, forwardRef} from '@angular/core';
import {Observable} from "rxjs";

@Directive({
  selector: "[appUniqueUsername]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUsernameValidatorDirective),
      multi: true
    }
  ]
})
export class UniqueUsernameValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueUsernameValidator) {
    console.log("Inside unique user validator directive constroctor");
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    console.log("Inside unique user validator directive > validate method call");
    return this.validator.validate(control);
  }
}
