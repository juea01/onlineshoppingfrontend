import {Injectable} from "@angular/core";
import {Question} from "./question.model";
import {Subject} from "./subject.model";
import {User} from "./user.model";
import {QuestionOption} from "./questionOption.model";
//import {StaticDataSource} from "./static.datasource";
import { filter } from 'rxjs/operators';
import {RestDataSource} from "./rest.datasource";
import { Observable } from "rxjs";
import * as _ from 'lodash';
import { ApiResponse } from "./apiResponse.model";
import { UserSubject } from "./userSubject.model";
import { UserRepository } from "src/app/model/user.repository";
import { CompletedQuestion } from "./completedQuestion.model";


@Injectable()
export class SubjectRepository {
  private questions: Question[] = [];
  private subjects: Subject[] = [];
  user = new User();
  private userSubjects: UserSubject[] = [];

  constructor(private dataSource: RestDataSource) {

  }

  getSubjectsByLevel(level: number):Observable<Subject[]> {
    return new Observable(observer => {

      //check if questions are already here
     const result = this.subjects?.filter(s => {
      return s.level=== level
      });

      if (!_.isEmpty(result)) {
        observer.next(result);
        observer.complete();
      } else {
        this.dataSource.getSubjectsByLevel(level).subscribe(data => {

          if (!_.isEmpty(data)) {
              if (!_.isEmpty(this.subjects)) {
                for (const subject of data) {
                  this.subjects.push(subject);
                }
              } else {
                this.subjects = data;
              }
          }

        observer.next(data);
        observer.complete();
        });

      }

    })

  }

  getSubjectsById(id: number):Observable<Subject> {
    return new Observable(observer => {
      //check if questions are already here
     const result = this.subjects?.find(s => {
      return s.id == id
      });

      if (!_.isEmpty(result)) {
        observer.next(result);
        observer.complete();
      } else {
        //need to get subject by id?
      }
    })
  }

  updateSubject(subject: Subject):Observable<Subject>{
    return new Observable(observer => {
      this.dataSource.updateSubject(subject).subscribe(data => {
        this.subjects.splice(this.subjects.findIndex(sub => sub.id == data.id),1, data);
        observer.next(data);
        observer.complete();
      }, error=> {
        observer.error(error);
      })
    })
  }

  saveQuestion(question: Question):Observable<Question>{
    return new Observable(observer => {
      this.dataSource.createQuestion(question).subscribe(data=> {
        this.questions.push(data);
        observer.next(data);
        observer.complete();
      })
    })
  }

  updateQuestion(question: Question):Observable<Question>{
    return new Observable(observer => {
      this.dataSource.updateQuestion(question).subscribe(data=> {
        this.questions.splice(this.questions.findIndex(ques=> ques.id == data.id), 1, data);
        observer.next(data);
        observer.complete();
      })
    })
  }

  SaveSubjectAndDes(subject: Subject):Observable<Subject>{
    console.log("save sub and des in sub repo"+subject.category);
    return new Observable(observer=> {
      this.dataSource.saveSubjectAndDes(subject).subscribe(data => {
        //successful, add to existing Subject list
        this.subjects.push(data);
        this.getQuestionsBySubjectId(data.id);
        observer.next(data);
        observer.complete();
      })
    })
  }

  getQuestionsBySubjectId(id: number):Observable<Question[]> {
    return new Observable(observer=> {
     //check if questions are already here
     const result = this.questions?.filter(q => {
      return q.subject.id == id
      });

      if (!_.isEmpty(result)) {
        observer.next(result);
        observer.complete();
      } else {
        this.dataSource.getQuestionsBySubjectId(id).subscribe(data => {
          if (!_.isEmpty(data)) {
              if (!_.isEmpty(this.questions)) {
                for (const question of data) {
                  this.questions.push(question);
                }
              } else {
                this.questions = data;
              }
          }
        observer.next(data);
        observer.complete();
        });
      }

    })
  }

  saveSubjectPracticeProgress(completedQuestions: CompletedQuestion[]):Observable<ApiResponse<null>> {
    return this.dataSource.saveSubjectPracticeProgress(completedQuestions);
  }

  saveUserSubject(userSubject: UserSubject):Observable<UserSubject> {
      return this.dataSource.saveUserSubject(userSubject);
    }

    updateUserSubject(userSubject: UserSubject):Observable<ApiResponse<null>> {
      return this.dataSource.updateUserSubject(userSubject);
    }

  getAllUserSubjectsForUser(userId: number):Observable<UserSubject[]> {
    return new Observable(observer=> {
      //check if user subject for logged in user are already here
     const result = this.userSubjects?.filter(uS => {
        return uS.user.id = userId
     });

    if (!_.isEmpty(result)) {
      observer.next(result);
      observer.complete();
    } else {

       this.dataSource.getUserSubjectsByUserId(userId).subscribe(data => {
            if (!_.isEmpty(data)) {
              this.userSubjects = data;
            }

          observer.next(data);
          observer.complete();
          });

     }
   })
  }

  getUserSubjectForUserByUserIdAndSubjectId(userId: number, subjectId: number):Observable<UserSubject> {
    return new Observable(observer=> {

      const result = this.userSubjects.find(data => {return data.subject.id == subjectId && data.user.id == userId});
      if (!_.isEmpty(result)) {
        observer.next(result);
        observer.complete();
      } else {
        this.dataSource.getUserSubjectsByUserAbdSubjectId(userId, subjectId).subscribe(data => {
          if (!_.isEmpty(data)) {
           const ind = this.userSubjects.findIndex(us => {return (us.subject.id == data.subject.id && us.user.id == data.user.id)});
            if(ind < 0) {
              this.userSubjects.push(data);
              //console.log("Nothing to update in local user subject repo");
            } else {
              //console.log(" local user subject repo updated.");
              this.userSubjects.splice(this.userSubjects.findIndex(us => {return (us.subject.id == data.subject.id && us.user.id == data.user.id)}),1,data);
            }
            observer.next(data);
            observer.complete();
          }
        });
      }

    })


  }




}
