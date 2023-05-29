import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { UniqueEmailValidator } from "./uniqueEmailValidator.service";
import { Directive, forwardRef, Input} from '@angular/core';
import {Observable} from "rxjs";

@Directive({
  selector: "[appUniqueUseremail]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUseremailValidatorDirective),
      multi: true
    }
  ]
})
export class UniqueUseremailValidatorDirective implements AsyncValidator {
  @Input() configValue: string;
  constructor(private validator: UniqueEmailValidator) {
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    this.validator.setConfigValue(this.configValue);
    return this.validator.validate(control);
  }
}
