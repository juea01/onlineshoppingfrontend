import { Injectable } from "@angular/core";
import { RestDataSource } from "./rest.datasource";
import { Article } from "./article.model";
import { Observable } from "rxjs";

@Injectable()
export class ArticleRepository {

  private articles: Article[] = [];
  private subcategories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getArticles().subscribe(data => {
      this.articles = data;
      this.subcategories = data.map(a => a.subcategory).filter((a, index, array) => array.indexOf(a) == index).sort();
    });
  }

  getArticles(subcategory: string = null): Article[] {
    return this.articles.filter(a => {
      return (!subcategory) || subcategory.toLocaleUpperCase() === a.subcategory.toLocaleUpperCase() }
      );
  }

  getArticleById(articleId: number): Article {
    return this.articles.find(a => a.id == articleId);
  }

  getSubCategories(): string[]{
    return this.subcategories;
  }

  getArticleSize(): number{
    return this.articles.length;
  }

}
