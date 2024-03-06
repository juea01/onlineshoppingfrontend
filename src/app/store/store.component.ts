import {Component, OnInit} from "@angular/core";
import { Product } from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";
import { Search } from '../model/search.model';
import { WindowSizeServiceService } from "../service/window-size-service.service";
import { ArticleRepository } from "../model/article.repository";
import { Article } from "../model/article.model";
import {ValueStoreService}  from "../service/value-store.service";

@Component({
  selector: "store",
  templateUrl: "store.component.html",
  styleUrls: ["store.component.css"]
})
export class StoreComponent implements OnInit{
  public selectedCategory = null;
  public productsPerPage = 3;
  public selectedPage = 1;
  public articleSelectedPage = 1;
  public articles: Article[] = [];
  public articlesPerPage: Article[] = [];

  constructor(private repository: ProductRepository, private cart: Cart, private router: Router,
    private searchString: Search, private windowSizeService: WindowSizeServiceService,
    private articleRepository: ArticleRepository, private valueStoreService: ValueStoreService) {}

    ngOnInit(): void {
      this.articleRepository.getAllArticles().subscribe(articles=> {
        this.articles = articles;
        if(this.valueStoreService.getArticlePagination()>0){
          this.articleSelectedPage = this.valueStoreService.getArticlePagination();
          this.valueStoreService.setArticlePagination(0);
        }
        this.populateArticlesPerPage();
      })

      if (this.valueStoreService.getProductPagination() >0){
        this.selectedPage = this.valueStoreService.getProductPagination();
        this.valueStoreService.setProductPagination(0);
      }

    }

  get products(): Product[] {
    let pageIndex = (this.selectedPage -1) * this.productsPerPage;
    this.selectedCategory = this.searchString.category;
    return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage);
  }

  getProductSize(): number {
    return this.repository.getProductSize();
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  changeArticlePage(newPage: number){
    this.articleSelectedPage = newPage;
    this.populateArticlesPerPage();
  }

  populateArticlesPerPage(): void{
    this.articlesPerPage = [];
    //ignore first items as it is already displayed as main article
    let startingIndex = ((this.articleSelectedPage*this.productsPerPage)-this.productsPerPage)+1;
    let endingIndex = (startingIndex+this.productsPerPage) < this.articles.length ? (startingIndex+this.productsPerPage): this.articles.length;
    for (let i = startingIndex; i<endingIndex; i++){
      this.articlesPerPage.push(this.articles[i]);
    }
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  get pageArticleCount(): number {
    return Math.ceil(this.articles.length / this.productsPerPage);
  }
  /*
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)).fill(0).map((x,i) => i + 1);
  }
  */

  navigateToProduct(productId: number) {
    this.valueStoreService.setProductPagination(this.selectedPage);
    this.router.navigate(['productDetail', productId]);
  }

  navigateToArticle(articleId: number) {
    this.valueStoreService.setArticlePagination(this.articleSelectedPage);
    this.router.navigate(['articleDetail', articleId]);
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }

  getWindowInnerWidth():number {
    return this.windowSizeService.getWindowInnerWidth();
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }
}
