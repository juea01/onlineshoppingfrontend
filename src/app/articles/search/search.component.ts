import { Component, OnInit } from '@angular/core';
import { Article } from "../../model/article.model";
import { ActivatedRoute} from "@angular/router";
import { ArticleRepository } from "../../model/article.repository";
import { ValueStoreService } from '../../service/value-store.service';
import { ComponentLiteralNavName } from "../../service/constants";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public selectedPage = 1;
  private articleList:Article[];
  public articlesPerPage = 4;
  public searchString = "";

  constructor(private activatedRoute: ActivatedRoute, private articleRepository: ArticleRepository,
    private valueStoreService: ValueStoreService, private router: Router) { }

  ngOnInit(): void {
    this.searchString = this.activatedRoute.snapshot.params["searchString"] ? this.activatedRoute.snapshot.params["searchString"]  : 'Java';
      this.articleRepository.searchArticles(this.searchString).subscribe(data => {
        this.articleList = data;
      });
  }

  /**
   * This method is returning articles based on page number and search word.
   * In addition since navigation component that has search bar in inside this component and
   * therefore in subsequence search from this page, Angular won't create this component again. So no method call for init().
   * Need to update this.searchString value if params value is changed.
   * @returns Filtered articles based on page number and search word
   */
  getArticles(): Article[] {
    let pageIndex = (this.selectedPage -1) * this.articlesPerPage;
    if (this.searchString != this.activatedRoute.snapshot.params["searchString"] ) {
      this.searchString = this.activatedRoute.snapshot.params["searchString"] ? this.activatedRoute.snapshot.params["searchString"]  : 'Java';
      this.articleList = null;
      this.articleRepository.searchArticles(this.searchString).subscribe(data => {
        this.articleList = data;
      });
    }
    return this.articleList?.slice(pageIndex, pageIndex + this.articlesPerPage);
  }

  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  navigateToArticleDetail(articleId: number) {
      // this.valueStoreService.setArticlePagination(this.selectedPage);
       this.valueStoreService.setPreviousPage(ComponentLiteralNavName.CompSearch);
       this.valueStoreService.setParamValue(this.searchString);
       this.router.navigate([ComponentLiteralNavName.CompArticleDetail, articleId]);
   }

}
