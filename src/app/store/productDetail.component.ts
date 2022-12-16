import {Component} from "@angular/core";
import { Product } from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Search } from '../model/search.model';
import { Images } from '../model/images.model';


@Component({
  selector: "productDetail",
  templateUrl: "productDetail.component.html",
  styleUrls: ["productDetail.component.css"]
})
export class ProductDetailComponent {

  product: Product = new Product();


  constructor(private repository: ProductRepository, private cart: Cart, private router: Router, private activatedRoute: ActivatedRoute, private searchString: Search, private images:Images) {
    this.product = this.repository.getProduct(this.activatedRoute.snapshot.params["id"]);
    this.images.setImages(this.product.images);
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }


  getWindowInnerWidth():number {
    return window.innerWidth;
  }

}
