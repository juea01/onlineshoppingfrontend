import { Article } from "./article.model";
export class ArticleImage {
  constructor(
    public id?: number,
    public name?: string,
    public location?: string,
    public article?: Article

  ){}
}
