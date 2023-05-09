import { Component } from "@angular/core";
import { Article } from "../model/article.model";
import { ArticleRepository } from "../model/article.repository";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { Search } from '../model/search.model';

@Component({
  selector: "app-article",
  templateUrl: "article.component.html",
  styleUrls: ["article.component.css"]
})
export class ArticleComponent {
  public selectedSubCategory = null;
  public articlesPerPage = 4;
  public selectedPage = 1;
  public articlesList: Article[] = [];

  constructor(private repository: ArticleRepository, private router: Router, private activatedRoute: ActivatedRoute, private searchString: Search) {
    let pageIndex = (this.selectedPage -1) * this.articlesPerPage;
    this.selectedSubCategory = this.activatedRoute.snapshot.params["subcategory"] ? this.activatedRoute.snapshot.params["subcategory"] : this.searchString.category;
    this.repository.getArticles(this.selectedSubCategory).subscribe(data => {
      this.articlesList = data;

    });

  }

  getArticles(): Article[] {

    if (this.selectedSubCategory == this.activatedRoute.snapshot.params["subcategory"] ? this.activatedRoute.snapshot.params["subcategory"] : this.searchString.category ) {
      let pageIndex = (this.selectedPage -1) * this.articlesPerPage;
      return this.articlesList?.slice(pageIndex, pageIndex + this.articlesPerPage);
    } else {
      this.selectedSubCategory = this.activatedRoute.snapshot.params["subcategory"] ? this.activatedRoute.snapshot.params["subcategory"] : this.searchString.category;
      this.repository.getArticles(this.selectedSubCategory).subscribe(data => {
        this.articlesList = data;
        let pageIndex = (this.selectedPage -1) * this.articlesPerPage;
        return this.articlesList?.slice(pageIndex, pageIndex + this.articlesPerPage);
      });
    }

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
}
