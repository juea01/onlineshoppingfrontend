import {  Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserRepository } from "../model/user.repository";
import { map } from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root'})
export class UniqueEmailValidator implements AsyncValidator {

  configValue: string = "subscriptionEmailCheck";

  constructor(private userRepository: UserRepository) {
  }

  validate( control: AbstractControl): Observable<{ [key: string]: any } | null> {

    if (this.configValue.includes("subscriptionEmailCheck")) {
      return this.userRepository.isSubscriptionEmailUnique(control.value).pipe(
        map(isTaken => (isTaken ? {emailTaken: true} : null))
      );
     } else {
      return this.userRepository.isUserEmailUnique(control.value).pipe(
        map(isTaken => (isTaken ? {emailTaken: true} : null))
      );
     }
  }

  setConfigValue(configValue: string): void {
    this.configValue = configValue;
  }





}
