import { Question } from "./question.model";

export class Subject {
  constructor(
    public id?: number,
    public category?: string,
    public subCategory?: string,
    public level?: number,
    public title?: string,
    public premium?: boolean,
    public questions?: Question[],
  ){}
}
