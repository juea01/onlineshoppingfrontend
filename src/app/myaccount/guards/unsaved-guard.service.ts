import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { QuestiondetailComponent } from '../questiondetail/questiondetail.component';
import * as _ from 'lodash';

/**
 * This Service class is intended for this module only and hence configuration in provider property of myaccount module file.
 * This class is still working in progress especially for showing message and buttons.
 */
@Injectable()
export class UnsavedGuardService {
  constructor(private router: Router) {}

  canDeactivate(
    component: QuestiondetailComponent
  ): Observable<boolean> | boolean {
    //console.log("Inside canDeactivate method");
    if (!_.isEmpty(component.correctQuestions)) {
      let subject = new Subject<boolean>();
      //console.log("Ask user if user want to discard changes");
      let responses: [string, (string) => void][] = [
        [
          'Discard Changes',
          () => {
            subject.next(true);
            subject.complete();
          },
        ],
        [
          'Do not Discard Changes',
          () => {
            this.router.navigateByUrl(this.router.url);
            subject.next(false);
            subject.complete();
          },
        ],
      ];
      return subject;
    }
    return false;
  }
}
