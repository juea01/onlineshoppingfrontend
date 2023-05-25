import {Component} from "@angular/core";
import { Product } from "../model/product.model";
import {ProductRepository} from "../model/product.repository";
import { Cart } from "../model/cart.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Search } from '../model/search.model';
import { Images } from '../model/images.model';
import { TermsDialogComponent } from "../service/terms-dialog.component";
import { MatDialog } from "@angular/material/dialog";



@Component({
  selector: "productDetail",
  templateUrl: "productDetail.component.html",
  styleUrls: ["productDetail.component.css"]
})
export class ProductDetailComponent {

  product: Product = new Product();


  constructor(private repository: ProductRepository, private cart: Cart, private router: Router, private activatedRoute: ActivatedRoute,
    private searchString: Search, private images:Images, private dialog: MatDialog) {
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

  openTermsDialog(event: Event): void {
    event.preventDefault();

    const dialogConfig = {
      data: {
        isAcceptDecline: false
      }
    };

    const dialogRef=this.dialog.open(TermsDialogComponent, dialogConfig);

    //In this particular scenario, we are not really interested in following event. This code is for reference purpose only.
    dialogRef.afterClosed().subscribe((result)=> {
      if(result) {
        // console.log("Accept");
      } else {
        // console.log("Decline");
      }
    })
  }





}
