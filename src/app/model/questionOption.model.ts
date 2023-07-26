import { Question } from "./question.model";

export class QuestionOption {
  constructor(
    public id?: number,
    public content?: string,
    public explanation?: string,
    public correctOption?: boolean,
    public question?: Question
  ){}
}
