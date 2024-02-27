import { ArticleImage } from "./articleImage.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Article {
  constructor(
    public id?: number,
    public title?: string,
    public category?: string,
    public subcategory?: string,
    public introduction?: string,
    public firstParagraph?: string,
    public secondParagraph?: string,
    public conclusion?: string,
    public publish?:boolean,

    public price?: number,

    public user?: User,
    public comments?: Comment[],

    public images?: ArticleImage[],

    public publishDate?: Date,
    public lastEditDate?: Date
  ){}
}
