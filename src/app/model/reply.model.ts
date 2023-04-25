import { Image } from "./image.model";
import { User } from "./user.model";
import { Article } from "./article.model";
import { Comment} from "./comment.model";

export class Reply {
  constructor(
    public id?: number,
    public description?: string,

    public user?: User,
    public comment?: Comment,
    public article?: Article
  ){}
}
