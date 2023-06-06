import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ArticleRepository } from "../model/article.repository";
import { Article } from "../model/article.model";


@Component({
  templateUrl: "articleTable.component.html"
})

export class ArticleTableComponent {

  public articles: Article[] = [];

  constructor(private repository: ArticleRepository) {
    console.log("Article Table constructor");
    this.repository.getAllArticles().subscribe(data => {
      console.log("Article Table constructor getAllArticles "+ data);
      this.articles = data;
    })
  }

  getArticles(): Article[] {
    return this.articles;
  }

  deleteProduct(id: number) {
    //this.repository.deleteProduct(id);
  }

}
