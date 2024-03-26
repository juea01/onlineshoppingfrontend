import { Component, OnInit } from '@angular/core';
import { Article } from "../../model/article.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public selectedPage = 1;
  private articleList:Article[];

  constructor() { }

  ngOnInit(): void {
  }

  getArticles(): Article[] {
    return this.articleList;
  }

  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  navigateToArticleDetail(articleId: number) {
    // this.valueStoreService.setArticlePagination(this.articleSelectedPage);
    // this.valueStoreService.setPreviousPage(ComponentLiteralNavName.CompArticle);
    //  this.router.navigate([ComponentLiteralNavName.CompArticleDetail, articleId]);
   }

}
