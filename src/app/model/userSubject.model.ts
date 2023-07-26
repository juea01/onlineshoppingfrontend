import { Subject } from "./subject.model";
import { User } from "./user.model";
import { CompletedQuestion } from "./completedQuestion.model";

export class UserSubject {
  constructor(
    public id?: number,
    public numCompletedQue?: number,
    public completed?: boolean,
    public enabled?: number,
    public subject?: Subject,
    public user?: User,
    public completedQuestions?: CompletedQuestion[]
  ){}
}
