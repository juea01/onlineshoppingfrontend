import { FormControl } from "@angular/forms";
import  * as _  from "lodash";

/**
 * This class check whether or not if isCorrectOption filed for creating optional choice for question/s has boolean true value
 * and if that is the case then enforce Explanation field to have content.
 * There is some bug in this class and work around has been introduced. This is reference purpose only for similar scenarios in future.
 */
export class CorrectOptionExplanationValidator {

  // static validate() {

  //   return (control:FormControl): {[key: string]: any} => {
  //     let isTrue = false;
  //     if (!_.isEmpty(control.parent)) {
  //       isTrue =  Boolean(control?.parent.get('isCorrectOption').value);
  //     }

  //     if (isTrue) {
  //       //check if explanation field have content
  //       let explanation = control.value;
  //       if (_.isEmpty(explanation)) {
  //          return {"explanation": {"explanation": explanation, "actualValue": "Empty"}};
  //       }
  //     }
  //     return null;
  //   }

  // }



}
