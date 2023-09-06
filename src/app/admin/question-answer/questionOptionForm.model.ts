import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import {CorrectOptionExplanationValidator} from "./correctOptionExplanation.formvalidator";

export class QuestionOptionFormControl extends FormControl {
  label: string;
  modelProperty: string;

  constructor(label:string, property:string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }

  getValidationMessages() {
    let messages: string[] = [];
    if(this.errors) {
      for (let errorName in this.errors) {
        switch(errorName) {
          case "required":
            messages.push(`You must enter a ${this.label}`);
            break;
          case "minlength":
            messages.push(` A ${this.label} must be at least ${this.errors['minlength'].requiredLength} characters`);
            break;
          case "maxlength":
            messages.push(` A ${this.label} must be no more than ${this.errors['maxlength'].requiredLength} characters`);
            break;
          case "pattern":
            messages.push(` The ${this.label} contains illegal characters`);
            break;
          case "explanation":
            messages.push(`The ${this.label} cannot be ${this.errors['explanation'].explanation}`);
            break;
        }
      }
    }
    return messages;
  }

}

export class QuestionOptionDropDownControl extends FormControl {
  label: string;
  modelProperty: string;
  constructor( label:string, property:string, value: any = null, validatorOrOpts?: any, asyncValidator?: any) {
    super(value, validatorOrOpts, asyncValidator);
    this.label = label;
    this.modelProperty = property;
  }

}





export class QuestionOptionFormGroup extends FormGroup {

  constructor() {
    super({
      content: new QuestionOptionFormControl("Content", "content", "", Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200)
      ])),
    selectedOption: new QuestionOptionDropDownControl("Select Option", "selectedOption" ),
      explanation: new QuestionOptionFormControl("Explanation", "explanation", "", Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(200),
        //CorrectOptionExplanationValidator.validate()
    ]))
    });


    // this.get('isCorrectOption').valueChanges.subscribe(value => {
    //   console.log("Value change event for isCorrectOption"+ value);
    //   let isTrue = Boolean(value);
    //   if (isTrue === true) {
    //     console.log("Value change event for isCorrectOption"+ value);
    //     this.get('explanation').setValidators(Validators.compose([
    //       Validators.required,
    //       Validators.minLength(10),
    //       Validators.maxLength(200)
    //     ]));
    //   }
    //   else if(isTrue === false) {
    //     console.log("Value change event for isCorrectOption"+ value);
    //     this.get('explanation').setValidators(Validators.compose([
    //       Validators.minLength(10),
    //       Validators.maxLength(200)
    //     ]));
    //   }
    //  this.get('explanation').updateValueAndValidity();
    // });

  }


  get questionOptionControls(): QuestionOptionFormControl[] {
    return Object.keys(this.controls)
    .map(k => this.controls[k] as QuestionOptionFormControl);
  }

  getValidationMessages(name: string): string[] {
    return (this.controls[name] as QuestionOptionFormControl).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach(c =>
      messages.push(...(c as QuestionOptionFormControl).getValidationMessages()));
    return messages;
  }


}
