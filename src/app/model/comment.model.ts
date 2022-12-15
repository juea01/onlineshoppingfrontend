import { Image } from "./image.model";
import { User } from "./user.model";
import { Article } from "./article.model";

export class Comment {
  constructor(
    public id?: number,
    public description?: string,

    public user?: User,
    public article?: Article
  ){}
}
