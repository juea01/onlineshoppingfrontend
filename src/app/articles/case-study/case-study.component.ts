import { Component, OnInit } from "@angular/core";
import { Article } from "../../model/article.model";
import { ArticleRepository } from "../../model/article.repository";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { Search } from '../../model/search.model';
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
    private activatedRoute: ActivatedRoute,
    private searchString: Search, private valueStoreService: ValueStoreService) {
  }

  ngOnInit(): void {
    this.getRemoteArticles();
  }

  getRemoteArticles() {
    this.repository.getArticlesByCategory(Category.CaseStudy).subscribe(data => {
        this.articlesList = data;
      });
  }

  getArticles(): Article[] {
    let pageIndex = (this.selectedPage -1) * this.articlesPerPage;

    if(this.activatedRoute.snapshot.params["subcategory"]) {
      if (this.selectedSubCategory == this.activatedRoute.snapshot.params["subcategory"] ) {
        //console.log("GetArticles old selectedCat"+this.selectedSubCategory);
        return this.articlesList?.slice(pageIndex, pageIndex + this.articlesPerPage);
      } else {
        //console.log("GetArticles new"+this.selectedSubCategory);
        this.getRemoteArticles();
      }
    } else {
      if (this.selectedSubCategory == this.searchString.category) {
        //console.log("search Articles old selectedCat"+this.selectedSubCategory);
        return this.articlesList?.slice(pageIndex, pageIndex + this.articlesPerPage);
      } else {
        //console.log("search Articles new selectedCat"+this.selectedSubCategory);
        this.getRemoteArticles();
      }
    }

  }

  /**
   * ToDO: THis method is working in progress
   */
  getSecurityRelatedArticles(): Article[] {
    return this.articlesList.filter(article=>{
     return article.subcategory == SubCategory.Security
    });
  }

  getArticleGeneralKnowledge(): Article[] {
    return this.articlesList.filter(article=>{
      return article.subcategory == SubCategory.GeneralKnowledge
    });

  }

  getPerformanceRelatedArticles(): Article[] {
   return this.articlesList.filter(article=>{
      return article.subcategory == SubCategory.Performance
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



