import {Component} from "@angular/core";
import { Product } from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";
import { Search } from '../model/search.model';

@Component({
  selector: "store",
  templateUrl: "store.component.html",
  styleUrls: ["store.component.css"]
})
export class StoreComponent {
  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: ProductRepository, private cart: Cart, private router: Router, private searchString: Search) {}

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

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage);
  }
  /*
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)).fill(0).map((x,i) => i + 1);
  }
  */

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }

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
     console.log(`height to set to main container as it is bigger than window height ${pixel}, ${this.getWindowInnerHeight()}`);
      return pixel+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
     console.log(`height to set to main container as it is smaller than window height ${pixel} , ${this.getWindowInnerHeight()}`);

      return this.getWindowInnerHeight()+200+"px";
    }
  }
}
