import { Component, OnInit } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleRepository } from "../model/article.repository";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { Search } from '../model/search.model';
import { ValueStoreService } from '../service/value-store.service';
import { ComponentLiteralNavName } from "../service/constants";

@Component({
  selector: "app-article",
  templateUrl: "article.component.html",
  styleUrls: ["article.component.css"]
})
export class ArticleComponent implements OnInit{
  public selectedSubCategory = "";
  public articlesPerPage = 4;
  public selectedPage = 1;
  public intermediateSelectedPage = 1;
  public advancedSelectedPage = 1;
  public articlesList: Article[] = [];

  constructor(private repository: ArticleRepository, private router: Router, private activatedRoute: ActivatedRoute,
    private searchString: Search, private valueStoreService: ValueStoreService) {
  }

  ngOnInit(): void {
    this.getRemoteArticles();
  }

  getRemoteArticles() {
    this.selectedSubCategory = this.activatedRoute.snapshot.params["subcategory"] ? this.activatedRoute.snapshot.params["subcategory"] : this.searchString.category;
    if(this.activatedRoute.snapshot.params["subcategory"]) {
      this.repository.getArticlesBySubCategory(this.selectedSubCategory).subscribe(data => {
        this.articlesList = data;

      });
    } else {
      this.repository.searchArticles(this.selectedSubCategory).subscribe(data => {
        this.articlesList = data;

      });
    }
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
  getIntermediateLevelArticles(): Article[] {
    let interArtList: Article[] = [];
    return interArtList;

  }

   /**
   * ToDO: THis method is working in progress
   */
   getAdvancedLevelArticles(): Article[] {
    let advArtList: Article[] = [];
    return advArtList;

  }

  getProductSize(): number {
    return this.repository.getArticleSize();
  }

  get subCategories(): string[] {
    return this.repository.getSubCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedSubCategory = newCategory;
  }

  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.articlesPerPage = Number(newSize);
    this.changePage(1);
  }

  // get pageCount(): number {
  //   return Math.ceil(this.repository.getArticles(this.selectedSubCategory).length / this.articlesPerPage);
  // }
  /*
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.articlesPerPage)).fill(0).map((x,i) => i + 1);
  }
  */

   /*
  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }
*/
  getWindowInnerWidth():number {
    return window.innerWidth;
  }

  getWindowInnerHeight():number {
    return window.innerHeight;
  }

  getMainContainerHeight():number {
    return document.querySelector('#main-container').clientHeight;
  }

  getOptimalMainContainerHeight():string {
    if (this.getMainContainerHeight() >= this.getWindowInnerHeight()) {
      let pixel = this.getMainContainerHeight();
      return pixel+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
      return this.getWindowInnerHeight()+200+"px";
    }
  }


  navigateToArticleDetail(articleId: number) {
   // this.valueStoreService.setArticlePagination(this.articleSelectedPage);
   this.valueStoreService.setParamValue(this.selectedSubCategory);
   this.valueStoreService.setPreviousPage(ComponentLiteralNavName.CompArticle);
    this.router.navigate([ComponentLiteralNavName.CompArticleDetail, articleId]);
  }
}
