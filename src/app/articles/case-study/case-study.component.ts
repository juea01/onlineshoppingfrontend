import { Component, OnInit } from "@angular/core";
import { Article } from "../../model/article.model";
import { ArticleRepository } from "../../model/article.repository";
import { Router } from "@angular/router";
import { Category, SubCategory } from '../../service/constants';
import { ValueStoreService } from '../../service/value-store.service';
import { ComponentLiteralNavName } from "../../service/constants";


@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.css']
})
export class CaseStudyComponent implements OnInit {

  public selectedSubCategory = "";
  public articlesPerPage = 4;
  public selectedPage = 1;
  public intermediateSelectedPage = 1;
  public advancedSelectedPage = 1;
  public articlesList: Article[] = [];

  constructor(private repository: ArticleRepository, private router: Router,
   private valueStoreService: ValueStoreService) {
  }

  ngOnInit(): void {
    this.getRemoteArticles();
  }

  getRemoteArticles() {
    this.repository.getArticlesByCategory(Category.CaseStudy).subscribe(data => {
        this.articlesList = data;
      });
  }

  /**
   * ToDO: THis method is working in progress
   */
  getNetworkingDbRelatedArticles(): Article[] {
    return this.articlesList.filter(article=>{
     return article.subcategory == SubCategory.Networking_Database
    });
  }

  getArticleGeneralKnowledge(): Article[] {
    return this.articlesList.filter(article=>{
      return article.subcategory == SubCategory.GeneralKnowledge
    });

  }

  getSecurityPerformanceRelatedArticles(): Article[] {
   return this.articlesList.filter(article=>{
      return article.subcategory == SubCategory.Security_Performance
    });

  }


  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  navigateToArticleDetail(articleId: number) {
    // this.valueStoreService.setArticlePagination(this.articleSelectedPage);
    this.valueStoreService.setPreviousPage(ComponentLiteralNavName.CompCaseStudy);
     this.router.navigate([ComponentLiteralNavName.CompArticleDetail, articleId]);
   }


}



