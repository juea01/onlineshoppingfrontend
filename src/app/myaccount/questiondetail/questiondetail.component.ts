import { Component, OnInit } from '@angular/core';
import { SubjectRepository } from 'src/app/model/subject.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { UserRepository } from "src/app/model/user.repository";
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

import { UserSubject } from 'src/app/model/userSubject.model';
import { CompletedQuestion } from 'src/app/model/completedQuestion.model';
import { Subject } from 'src/app/model/subject.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-questiondetail',
  templateUrl: './questiondetail.component.html',
  styleUrls: ['./questiondetail.component.css']
})
export class QuestiondetailComponent implements OnInit {
  questions: Question[] = [];
  questionNum: number = 0;
  selectedOption="";

  public errorMessage: string;
  public successMessage: string;
  public explanation: string;
  public complete: boolean =false;

  correctQuestions: CompletedQuestion[] = [];
  userSubject: UserSubject;
  user = new User();
  level = 0;
  public subCategory: string;


  constructor(private repository: SubjectRepository, private userRepository: UserRepository, private router: Router, private activatedRoute: ActivatedRoute) {
    this.level = this.activatedRoute.snapshot.params["level"];
    this.subCategory = this.activatedRoute.snapshot.params["subCategory"];
    this.userRepository.loadUserForUserDetail().pipe(
      filter(data => data !== null)
      ).subscribe(
      user => {
        this.user = user;
        this.getQuestionsBySubjectId(this.activatedRoute.snapshot.params["id"]);
      }, errorMessage => {

      });
  }

  getQuestionsBySubjectId(subjectId: number) {
    this.repository.getQuestionsBySubjectId(subjectId).subscribe( data => {
      this.questions = data;
      this.getUserSubjectByUserIdAndSubjectId(this.user.id, this.activatedRoute.snapshot.params["id"]);
    });
  }

  getUserSubjectByUserIdAndSubjectId(userId: number, subjectId: number, setInitialQuestionNum: boolean = true, exit: boolean = false) {
    this.repository.getUserSubjectForUserByUserIdAndSubjectId(userId, subjectId).subscribe(data => {
      this.userSubject = data;
      if(setInitialQuestionNum){
        this.setInitialQuestionNum();
      }
      if(exit) {
        this.exit();
      }
    })
  }

  ngOnInit(): void {
  }

  previous() {
    this.clearMessages();
    if (this.questionNum === 0) {
      this.questionNum = 0;
    } else {
      this.questionNum--;
    }
    this.displaySelectedAnswAndExpla();
  }

  checkAnswer() {
    this.errorMessage=null;
    this.explanation = null;
      if (_.isEmpty(this.selectedOption) ) {
        this.errorMessage="Please select one of the options."
      } else {
        this.errorMessage="Incorrect answer.";
        for (let i=0; i<this.questions[this.questionNum].options.length;i++){
          if(this.questions[this.questionNum].options[i].content === this.selectedOption && this.questions[this.questionNum].options[i].correctOption){
            this.errorMessage=null;
            this.explanation = this.questions[this.questionNum].options[i].explanation;
            this.addCorrectQuestionToList(this.questions[this.questionNum].id);
            break;
          }
        }
      }
  }

  displaySelectedAnswAndExpla() {
    let hasFound = false;
    for (let i=0; i<this.correctQuestions.length;i++){
      if(this.questions[this.questionNum]?.id == this.correctQuestions[i]?.question.id){
        this.clearMessages();
        for (let j=0; j<this.questions[this.questionNum]?.options.length;j++){
          if(this.questions[this.questionNum]?.options[j].correctOption){

            this.explanation = this.questions[this.questionNum]?.options[j].explanation;
            this.selectedOption = this.questions[this.questionNum]?.options[j].content;
            hasFound = true;
            break;
          }
        }
        break;
      }
    };

    //here if user has saved (correctQuestions will be empty) so check with this.userSubject.completedQuestions
    //also even if correctQuestions is not empty (hasFound is false) check in this.userSubject.completedQuestions (for example previous save)
    if (!hasFound) {
      for (let i=0; i<this.userSubject.completedQuestions.length;i++){
        if(this.questions[this.questionNum]?.id == this.userSubject.completedQuestions[i]?.question.id){
          this.clearMessages();
          for (let j=0; j<this.questions[this.questionNum]?.options.length;j++){
            if(this.questions[this.questionNum]?.options[j].correctOption){

              this.explanation = this.questions[this.questionNum]?.options[j].explanation;
              this.selectedOption = this.questions[this.questionNum]?.options[j].content;
              break;
            }
          }
          break;
        }
      };
    }

  }

  /**
   * If user has all completed questions from this subject
   * then only need to show previous, skip and view other exercise(at the end) buttons.
   * If this is first time trying then (userSubject would be null or empty) then start from beginning.
   * If working in progress then start from first question that hasn't been completed.
   */
  setInitialQuestionNum():void {
    if(_.isEmpty(this.userSubject) || this.userSubject.completed) {
      this.questionNum = 0;
      this.displaySelectedAnswAndExpla();
    } else {
      for ( let i=0; i<this.questions.length; i++) {

        //if result is empty then the question id is not in completedQuestions list
        const result = this.userSubject?.completedQuestions.filter(cs => {
          return cs.question.id == this.questions[i].id
       });

       if (_.isEmpty(result)) {
        break;
       } else {
        this.questionNum++;
        if (this.questionNum === this.questions.length) {
          this.complete = true;
        }
       }
      }
    }
  }



  next() {
   this.clearMessages();

    if (this.questionNum < (this.questions.length)) {
      this.questionNum++;
      this.displaySelectedAnswAndExpla();
    }

    if (this.questionNum === this.questions.length) {
      this.complete = true;
    }
  }

  addCorrectQuestionToList(questionId: number):void {
      let question: Question = new Question();
      question.id = questionId;

      let completedQuestion: CompletedQuestion = new CompletedQuestion();
      completedQuestion.question= question;

      this.correctQuestions.push(completedQuestion);
  }

  skip() {
    this.clearMessages();
    if (this.questionNum < (this.questions.length-1)) {
      this.questionNum++;
    }
  }

  /**
   * If userSubject is null or empty then this is first time saving and therefore
   *  first save userSubject and then completed questions.
   * If userSubject is not null then only need to save completed questions.
   * Once completed questions are saved successfully then make completedQuestions empty
   *  so that if user click save again without any new completed question then no need to send request again to backend.
   */
   saveProgress(exit:boolean = false) {
    this.errorMessage = null;
    if(_.isEmpty(this.userSubject)&&(!_.isEmpty(this.correctQuestions))) {
      this.userSubject = new UserSubject();
      this.userSubject.subject = new Subject(this.activatedRoute.snapshot.params["id"]);
      this.userSubject.user = new User(this.user.id);
      this.repository.saveUserSubject(this.userSubject).subscribe(data=> {
        this.userSubject.id = data.id;
        this.saveSubjectPracticeProgress( this.userSubject.id, exit);
      }, error=> {
        this.userSubject = null;
        this.errorMessage = "Error saving progress, please try again later."
      })
    } else if(!_.isEmpty(this.userSubject)&&(!_.isEmpty(this.correctQuestions))) {
      this.saveSubjectPracticeProgress(this.userSubject.id, exit);
    } else {
      this.successMessage = "Nothing to save.";
    }
   }

   saveSubjectPracticeProgress(userSubjectId: number, exit: boolean = false):void {
    //add userSubject id to each completed questions
    for(let i = 0; i< this.correctQuestions.length; i++) {
      let userSubject: UserSubject = new UserSubject();
      userSubject.id = userSubjectId;
      this.correctQuestions[i].userSubject = userSubject;
    }

    this.repository.saveSubjectPracticeProgress(this.correctQuestions).subscribe(data=> {
      if(_.isEmpty(this.userSubject?.completedQuestions)) {
        this.userSubject.completedQuestions = this.correctQuestions;
      } else {
        for(let i = 0; i< this.correctQuestions.length; i++) {
          this.userSubject.completedQuestions.push(this.correctQuestions[i]);
        }
      }

      //here clear correct question list
      this.correctQuestions.splice(0, this.correctQuestions.length);
      this.successMessage = "Progress saved successfully."


      //update user_subject to complete if all questions has been answered correctly
      if (this.userSubject.completedQuestions.length == this.questions.length) {
        this.userSubject.completed = true;
        this.repository.updateUserSubject(this.userSubject).subscribe(data => {
          //console.log(data);
        }, error=> {
          //console.log(error);
        })
      }

      //refresh repo
      this.getUserSubjectByUserIdAndSubjectId(this.user.id, this.activatedRoute.snapshot.params["id"], false, exit);

    }, error=> {
      this.errorMessage = "Error saving progress, please try again later."
    });
   }

   clearMessages():void {
    this.errorMessage=null;
    this.explanation = null;
    this.successMessage = null;
   }

   exit():void {
    this.router.navigate(['/myaccount/main/practicetests',this.level, this.subCategory]);
   }

   saveAndExit():void {
    this.saveProgress(true);
   }

  getWindowInnerWidth():number {
    return window.innerWidth;
  }

  getWindowInnerHeight():number {
    return window.innerHeight;
  }

  getMainContainerHeight():number {
    return document.querySelector('#main-container').clientHeight;
  }

  getOptimalMainContainerHeight():string {
    if (this.getMainContainerHeight() >= this.getWindowInnerHeight()) {
      let pixel = this.getMainContainerHeight();
      return pixel+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
      return this.getWindowInnerHeight()+200+"px";
    }
  }

}
