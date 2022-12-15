import { Component } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleRepository } from "../model/article.repository";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleDetailComponent {

  article: Article = new Article();


  constructor(private router: Router, activeRoute: ActivatedRoute, private repository: ArticleRepository) {
    //this subscription should be in article repository class
     repository.getArticleById(1).subscribe(data => {
      this.article =data;
    });

  }



}
