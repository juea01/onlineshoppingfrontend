import { Component, OnInit } from "@angular/core";
import { Product } from "../model/product.model";
import { User } from "../model/user.model";
import { ArticleRepository } from "../model/article.repository";
import { UserRepository } from "../model/user.repository";
import { Article } from "../model/article.model";


@Component({
  templateUrl: "articleTable.component.html"
})

export class ArticleTableComponent implements OnInit {

  public articles: Article[] = [];
  private user: User = new User();

  constructor(private repository: ArticleRepository, private userRepository: UserRepository) {
  }

  ngOnInit(): void {
    //console.log("Article Table ngOnInit");
    this.userRepository.loadUserForUserDetail().subscribe(user=> {
      this.user = user;
      this.repository.getAllArticlesByAuthorId(this.user.id).subscribe(data => {
        this.articles = data;
      })
    })
  }

  getArticles(): Article[] {
    return this.articles;
  }

  deleteProduct(id: number) {
    //this.repository.deleteProduct(id);
  }

}
