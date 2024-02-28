import { Question } from "./question.model";
import { User} from "./user.model";

export class Subject {
  constructor(
    public id?: number,
    public category?: string,
    public subCategory?: string,
    public level?: number,
    public title?: string,
    public premium?: boolean,
    public publish?:boolean,
    public questions?: Question[],
    public user?: User
  ){}
}
