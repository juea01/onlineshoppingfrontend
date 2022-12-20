import { Image } from "./image.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Article {
  constructor(
    public id?: number,
    public title?: string,
    public category?: string,
    public subcategory?: string,
    public description?: string,
    public content?: string,
    public price?: number,

    public user?: User,
    public comments?: Comment[],

    public images?: Image[],

    public publishDate?: Date,
    public lastEditDate?: Date
  ){}
}
