import { Question } from "./question.model";
import { UserSubject } from "./userSubject.model";

export class CompletedQuestion {
  constructor(
    public id?: number,
    public userSubject?: UserSubject,
    public question?: Question,
  ){}
}
