import {  Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserRepository } from "../model/user.repository";
import { catchError, map } from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {

  constructor(private userRepository: UserRepository) {
    console.log("Inside unique user validator  constroctor");
  }

  validate( control: AbstractControl): Observable<{ [key: string]: any } | null> {
    console.log("Inside unique user validator  > validate method call");
    return this.userRepository.isUserNameUnique(control.value).pipe(
      map(isTaken => (isTaken ? {usernameTaken: true} : null))
    );
  }

}
