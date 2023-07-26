import { Article } from "./article.model";
import { QuestionOption } from "./questionOption.model";
import { Subject } from "./subject.model";

export class Question {
  constructor(
    public id?: number,
    public content?: string,

    public article?: Article,
    public subject?: Subject,
    public options?: QuestionOption[]
  ){}
}
