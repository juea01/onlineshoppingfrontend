import { Component } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleRepository } from "../model/article.repository";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.css']
})
export class ArticleDetailComponent {

  article: Article = new Article();

  constructor(private repository: ArticleRepository, private router: Router, private activatedRoute: ActivatedRoute) {
    this.article = this.repository.getArticleById(this.activatedRoute.snapshot.params["id"]);

  }



}
