import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { Article } from "./article.model";
import { Observable } from "rxjs";

@Injectable()
export class ArticleRepository {


  constructor(private dataSource: RestDataSource) {

  }

  getArticleById(articleId: number): Observable<Article> {
    return this.dataSource.getArticle(articleId);
  }
}
