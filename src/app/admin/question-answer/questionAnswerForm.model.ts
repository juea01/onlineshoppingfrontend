import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import { QuestionOptionFormGroup } from './questionOptionForm.model';

export class QuestionAnswerFormControl extends FormControl {
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
        }
      }
    }
    return messages;
  }

}

/**
 * Note that property name, for example content, as well as variable pointer name
 * content has to correspond to the names of the input elements in the template
 */
export class QuestionAnswerFormGroup extends FormGroup {

  constructor() {
    super({
      content: new QuestionAnswerFormControl("Content", "content", "", Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200)
      ])),
      id: new QuestionAnswerFormControl("Article Id", "id", "", Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]+$")
    ])),
    options: new FormArray([new QuestionOptionFormGroup()])
    });
  }

  get productControls(): QuestionAnswerFormControl[] {
    return Object.keys(this.controls)
    .map(k => this.controls[k] as QuestionAnswerFormControl);
  }

  getValidationMessages(name: string): string[] {
    return (this.controls[name] as QuestionAnswerFormControl).getValidationMessages();
  }

  getFormValidationMessages(): string[] {
    let messages: string[] = [];
    Object.values(this.controls).forEach(c =>
      messages.push(...(c as QuestionAnswerFormControl)?.getValidationMessages()));
    return messages;
  }

  getOption(): FormArray {
    let  options = this.get('options') as FormArray;
    return options;
  }

  addOption(){
    let  options = this.get('options') as FormArray;
    options.push(new QuestionOptionFormGroup());
  }

  setContent(value: any) {
    let content = this.get('content') as QuestionAnswerFormControl;
    content.patchValue(value);
  }

  setArticleId(value: any) {
    let articleId = this.get('id') as QuestionAnswerFormControl;
    articleId.patchValue(value);
  }

}


