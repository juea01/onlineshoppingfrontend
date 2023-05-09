import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { Article } from "./article.model";
import { Reply } from "./reply.model";
import { Comment } from "./comment.model";
import { Observable } from "rxjs";
import { ActivatedRoute} from "@angular/router";
import { catchError, map } from "rxjs/operators";
import * as _ from 'lodash';


@Injectable()
export class ArticleRepository {

  private articles: Article[] = [];
  private subcategories: string[] = [];
  public selectedSubCategory = null;


  constructor(private dataSource: RestDataSource, private activatedRoute: ActivatedRoute,) {

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


  saveArticle(article: Article): Observable<number> {

    return  new Observable(observer =>{
      if (article.id == null || article.id == 0){
        this.dataSource.saveArticle(article).subscribe(a => {
          article.id = a.id;
          this.articles.push(article);
          observer.next(a.id);
          observer.complete();
        }, error => {
          observer.error(error);
        });
      }
      else {
        this.dataSource.updateArticle(article).subscribe(a => {
          this.articles.splice(this.articles.findIndex(a => a.id == article.id),1,article);
          observer.next(a.id);
          observer.complete();
        }, error => {
          observer.error(error);
        } )
      }

    });

}

saveImage(formData: FormData, aId: number) {
  this.dataSource.saveArticleImage(formData).subscribe(res => {
      let article = this.articles.find(a => a.id == aId);

      if (article.images) {
        for (const img of res) {
          article.images.push(img);
        }
      } else {
        article.images = res;
      }

      this.articles.splice(this.articles.findIndex(a => a.id == article.id),1,article);
  })
}

deleteImage(id: number, aId: number): Observable<Article> {
  return new Observable(observer => {
    this.dataSource.deleteArticleImage(id).subscribe(res => {
      let article = this.articles.find(a => a.id == aId);
      let images = article.images;
      images.splice(images.findIndex(img => img.id == id),1);
      article.images = null;
      article.images = images;
      this.articles.splice(this.articles.findIndex(p => p.id == article.id),1,article);
      observer.next(article);
      observer.complete();
    })
  })

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

 getAllArticles():Observable<Article[]> {
  return this.dataSource.getArticles();
 }

  getArticles(subcategory: string):Observable<Article[]> {
    return new Observable(observer => {

      //check if articles are already hrere
     const result = this.articles?.filter(a => {
      return  a.subcategory.toLocaleLowerCase() === subcategory.toLocaleLowerCase()
      });

      if (!_.isEmpty(result)) {
        observer.next(result);
        observer.complete();
      } else {
        this.dataSource.getArticleBySubcategory(subcategory ? subcategory :'HTML').subscribe(data => {

          if (!_.isEmpty(data)) {
              if (!_.isEmpty(this.articles)) {
                for (const art of data) {
                  this.articles.push(art);
                }
              } else {
                this.articles = data;
              }
          }

        observer.next(data);
        observer.complete();
        });

      }

    })

  }

  getArticleDetailById(articleId: number): Observable<Article> {
   return this.dataSource.getArticleDetailById(articleId);
  }

  getSubCategories(): string[]{
    return this.subcategories;
  }

  getArticleSize(): number{
    return this.articles?.length;
  }

}
