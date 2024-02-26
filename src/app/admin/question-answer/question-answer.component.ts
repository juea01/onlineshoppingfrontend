import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormArray } from "@angular/forms";
import {Router, ActivatedRoute } from "@angular/router";

import { Subject } from '../../model/subject.model';
import { SubjectRepository } from "../../model/subject.repository";
import { UserRepository } from "../../model/user.repository";
import { Question } from '../../model/question.model';
import { QuestionOption } from '../../model/questionOption.model';
import { QuestionAnswerFormGroup, QuestionAnswerFormControl } from './questionAnswerForm.model';
import { QuestionOptionFormGroup } from './questionOptionForm.model';
import { Article } from '../../model/article.model';
import { User } from '../../model/user.model';
import * as _ from 'lodash';
import { filter } from 'rxjs/operators';
import { WindowSizeServiceService } from "../../service/window-size-service.service";

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css']
})
export class QuestionAnswerComponent implements OnInit, OnDestroy {

  public errorMessage: string;
  editing: boolean = false;
  isUpdateQuestion: boolean = false;
  subject: Subject = new Subject();
  question: Question = new Question();
  questions: Question[] = [];
  questionOptions: QuestionOption[] = [];

  options: FormArray= new FormArray([]);

  questionForm: QuestionAnswerFormGroup = new QuestionAnswerFormGroup();
  optionFormGroup: QuestionOptionFormGroup = new QuestionOptionFormGroup();
  questionOptionFormGroup: QuestionOptionFormGroup[];
  formSubmitted: boolean = false;

  yesNoOption: any = [true, false];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private subjectRepo: SubjectRepository,
    private userRepository: UserRepository, private windowSizeService: WindowSizeServiceService) {

  }

  prePopulateQuestionForm():void {
    this.questionForm.setContent(this.question.content);
    this.questionForm.setArticleId(this.question.article.id);
  }

  prePopulateOptionForm():void {
    this.addQuestionOption();
    let  options = this.questionForm.get('options') as FormArray;
    for (let i = 0; i < options.length; i++) {
      const queOptFormGroup = options.at(i) as QuestionOptionFormGroup;
      // Access each form control within the customFormGroup
      queOptFormGroup.get('content').patchValue(this.question.options[i].content);
      queOptFormGroup.get('selectedOption').patchValue(this.question.options[i].correctOption);
      queOptFormGroup.get('explanation').patchValue(this.question.options[i].explanation);
    }
  }

  ngOnInit(): void {

    this.editing = this.activatedRoute.snapshot.params["mode"] == "edit";

    if (!this.editing){
      this.activatedRoute.queryParams.subscribe(params =>{
        this.subject.title = params.title;
        this.subject.category = params.category;
        this.subject.level = params.level;
        this.subject.subCategory = params.subCategory;
        this.subject.premium = params.premium;
        this.userRepository.loadUserForUserDetail().pipe(
          filter(data => data !== null)
          ).subscribe(
          user => {
          this.subject.user = user;
         // console.log("Success"+this.user.id+this.user.username);
          }, error => {
            //console.log(error);
          });

      });
    } else {
      //console.log("Editing");
      if(this.activatedRoute.snapshot.params["questionId"]) {
        //Editing existing question
        //console.log("Editing existing question");
        this.isUpdateQuestion = true;
        this.subject.id = this.activatedRoute.snapshot.params["id"];
        this.subjectRepo.getQuestionsBySubjectId(this.subject.id).subscribe(data=> {
          for(const question of data) {
            //console.log(`Question id ${question.id}`);
            if (question.id == this.activatedRoute.snapshot.params["questionId"]) {
              this.question = question;
              //console.log(`Matching question with id ${question.id} found`);
              break;
            }
          }
          this.prePopulateQuestionForm();
          this.prePopulateOptionForm();
        });
      } else {
        //Subject is already created and therefore only need id here.
        //Adding more question to existing Subject
        //console.log("Adding more question");
        this.subject.id = this.activatedRoute.snapshot.params["id"];
      }
    }
  }

  ngOnDestroy(): void {
      this.windowSizeService.resetAdditionalPixelToMainContainerHeight();
  }

  chooseOption(e: any, index: number) {
    //console.log(`Value ${e.target.value} and index is ${index}`);
    this.options.at(index).patchValue(e.target.value);
  }


  attachQuestionToSubject():void {
    this.questions.push(this.question);
    this.subject.questions = this.questions;
  }

  assembleQuestion():void {
    //populate question object with data from form elements
    Object.keys(this.questionForm.controls).forEach(c => {
      if(c.includes("id")) {
        let article: Article = new Article();
        article[c] = this.questionForm.controls[c].value;
        this.question.article = article;

        //this is needed to avoid circular reference error when sending request over network
        if(this.editing) {
          this.question.subject = this.subject;
        }
      } else {
        this.question[c] = this.questionForm.controls[c].value;
      }
    });
  }

  attachQuestionOptionToQuestion():void {
    let  options = this.questionForm.get('options') as FormArray;
    for (let i = 0; i < options.length; i++) {
      const customFormGroup = options.at(i) as QuestionOptionFormGroup;

      // Access each form control within the customFormGroup
      let questionOption: QuestionOption = new QuestionOption();
      questionOption.content = customFormGroup.get('content').value;
      questionOption.correctOption = customFormGroup.get('selectedOption').value;
      questionOption.explanation = customFormGroup.get('explanation').value;
      this.questionOptions.push(questionOption);
    }
    this.question.options = this.questionOptions;
  }

  /**
   * If saving for first time, for example Subject Id is null, then use saveSubjectAndDescendant method.
   * Otherwise individual save and update methods.
   */
  save() {
    if (!this.editing){
      this.saveSubjectAndDescendant();
    } else {
      if (!this.isUpdateQuestion) {
        this.saveQuestion();
      } else {
        this.updateQuestion();
      }
    }
  }

  saveSubjectAndDescendant():void {
    //console.log("save sub and des");
    this.formSubmitted = true;
    if (this.questionForm.valid) {
     this.assembleQuestion();
     this.attachQuestionToSubject();
     this.attachQuestionOptionToQuestion();

     this.subjectRepo.SaveSubjectAndDes(this.subject).subscribe(data => {
      this.router.navigate([`/admin/main/questionanswereditor/${data.id}`]);
     }, error => {
       this.errorMessage = "Something went wrong, please contact admin or try again later.";
     });
    } else {
     this.errorMessage = "Form Data Invalid";
    }
  }

  saveQuestion() {
    if(this.questionForm.valid) {
      this.assembleQuestion();
      this.attachQuestionOptionToQuestion();
      this.subjectRepo.saveQuestion(this.question).subscribe(data => {
        this.router.navigate([`/admin/main/questionanswereditor/${this.subject.id}`]);
      }, error => {
        this.errorMessage = "Something went wrong, please contact admin or try again later.";
      });
    } else {
      this.errorMessage = "Form Data Invalid";
     }
  }

  updateQuestion() {
    if(this.questionForm.valid) {
      this.assembleQuestion();
      this.attachQuestionOptionToQuestion();
      this.subjectRepo.updateQuestion(this.question).subscribe(data => {
        this.router.navigate([`/admin/main/questionanswereditor/${this.subject.id}`]);
      }, error => {
        this.errorMessage = "Something went wrong, please contact admin or try again later.";
      });
    } else {
      this.errorMessage = "Form Data Invalid";
     }
  }

  /**
   * This method add options for the given question.
   * At the moment only allow to add up to two options.
   */
  addQuestionOption():void {
   if(this.options.length < 2) {
      this.questionForm.addOption();
      this.options = this.questionForm.getOption();
      this.windowSizeService.addAdditionalPixelToMainContainerHeight();
    }
  }



  search(searchValue?: string ) {
    // console.log(this.selectedOption);
    // if (this.selectedOption == "searchProduct") {
    //   this.searchString.category = searchValue;
    //   this.searchInput.nativeElement.value = "";
    //   this.router.navigate(['store']);
    // } else {
    //   this.searchString.category = searchValue;
    //   this.searchInput.nativeElement.value = "";
    //   this.router.navigate(['article']);
    // }


  }

}
