import {Component} from "@angular/core";
import { Product } from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router } from "@angular/router";
import { Search } from '../model/search.model';
import { WindowSizeServiceService } from "../service/window-size-service.service";

@Component({
  selector: "store",
  templateUrl: "store.component.html",
  styleUrls: ["store.component.css"]
})
export class StoreComponent {
  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: ProductRepository, private cart: Cart, private router: Router, private searchString: Search, private windowSizeService: WindowSizeServiceService) {}

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
    return this.windowSizeService.getWindowInnerWidth();
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }
}
