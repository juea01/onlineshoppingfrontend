import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { Article } from "./article.model";
import { Reply } from "./reply.model";
import { Comment } from "./comment.model";
import { Observable } from "rxjs";
import { ActivatedRoute} from "@angular/router";
import { catchError, map } from "rxjs/operators";


@Injectable()
export class ArticleRepository {

  private articles: Article[] = [];
  private subcategories: string[] = [];
  public selectedSubCategory = null;

  constructor(private dataSource: RestDataSource, private activatedRoute: ActivatedRoute,) {
    this.selectedSubCategory =  window.sessionStorage.getItem('articleSubcategory');
    dataSource.getArticleBySubcategory(this.selectedSubCategory).subscribe(data => {
      this.articles = data;
      this.subcategories = data.map(a => a.subcategory).filter((a, index, array) => array.indexOf(a) == index).sort();
    });
  }

  saveComment(comment: Comment): Observable<Comment> {
    if (comment.id == null || comment.id == 0) {
      return this.dataSource.saveComment(comment).pipe(
        map((value: Comment) =>{
          return value;
        }));
    } else {
      return this.dataSource.updateComment(comment).pipe(
        map((value: Comment) =>{
          return value;
        })
      );
    }
  }

  postReplies(reply: Reply): Observable<Reply> {
    if (reply.id == null || reply.id == 0) {
      return this.dataSource.saveReply(reply);
    } else {
      return this.dataSource.updateReply(reply);
    }
  }

  getRepliesByArticleAndCommentId(articleId: number, commentId: number): Observable<Reply[]>{
    return this.dataSource.getRepliesByArticleAndCommentId(articleId, commentId);
  }

  getArticles(subcategory: string = null): Article[] {
    //TODO: Backend need to include sub category in returned data, currently loading data in constructor in already filtered
    //return this.articles.filter(a => {
    //   return (!subcategory) || subcategory.toLocaleUpperCase() === a.subcategory.toLocaleUpperCase() }
    //   );
    return this.articles;
  }

  getArticleDetailById(articleId: number): Observable<Article> {
   return this.dataSource.getArticleDetailById(articleId);
  }

  getSubCategories(): string[]{
    return this.subcategories;
  }

  getArticleSize(): number{
    return this.articles.length;
  }

}
