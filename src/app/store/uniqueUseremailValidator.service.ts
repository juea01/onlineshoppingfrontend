import {  Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserRepository } from "../model/user.repository";
import { map } from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root'})
export class UniqueUseremailValidator implements AsyncValidator {

  constructor(private userRepository: UserRepository) {
  }

  validate( control: AbstractControl): Observable<{ [key: string]: any } | null> {
    return this.userRepository.isUserEmailUnique(control.value).pipe(
      map(isTaken => (isTaken ? {emailTaken: true} : null))
    );
  }

}
