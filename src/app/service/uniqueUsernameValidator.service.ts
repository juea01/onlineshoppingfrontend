import {  Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserRepository } from "../model/user.repository";
import { map } from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {

  constructor(private userRepository: UserRepository) {
  }

  validate( control: AbstractControl): Observable<{ [key: string]: any } | null> {
    return this.userRepository.isUserNameUnique(control.value).pipe(
      map(isTaken => (isTaken ? {usernameTaken: true} : null))
    );
  }

}
