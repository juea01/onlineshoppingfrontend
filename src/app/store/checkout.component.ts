import {AfterViewInit, Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {OrderRepository} from "../model/order.repository";
import {Order} from "../model/order.model";
import {Product} from "../model/product.model";
import {Cart, CartLine} from "../model/cart.model";
import { UserRepository } from "../model/user.repository";
import { User } from "../model/user.model";

@Component({
  templateUrl: "checkout.component.html",
  styleUrls: ["checkout.component.css"]
})
export class CheckoutComponent implements AfterViewInit{
  orderSent: boolean = false;
  submitted: boolean = false;
  public errorMessage: string;
  cartFromCache: Cart = new Cart();

  sameAsPrimaryAddress = true;
  public isLoggedIn = false;
  public user: User;

  /**
   * Please note that we can't directly parse cart object stored in local storage to this.cart directly as doing so make
   * other component for example cart detail component not detecting changes to this injectable model object
   * @param repository
   * @param order
   * @param cart
   */
  constructor(public repository: OrderRepository, public order: Order, public cart: Cart, private userRepository: UserRepository) {
    this.order.country = "New Zealand";

    let cartString: string =  window.sessionStorage.getItem("ShoppingCart");
    if (cartString) {
        this.cartFromCache = JSON.parse(cartString) as Cart;
        this.isLoggedIn = true;
        window.sessionStorage.setItem("ShoppingCart","");
        this.cart.itemCount = this.cartFromCache.itemCount;
        this.cart.cartPrice = this.cartFromCache.cartPrice;
        this.cartFromCache.lines.forEach(line => {
          this.cart.addLine(line.product, line.itemCount);
        });
    }

  }

  ngAfterViewInit() {
  }

  getLoggedInUserDetail():User {
   return this.userRepository.getUser();
  }



  submitOrder(form: NgForm) {
    this.submitted = true;
    console.log("Cart Price"+this.order.cart.cartPrice);
    if (form.valid) {

      if(this.isLoggedIn && this.sameAsPrimaryAddress) {
        this.order.user = this.getLoggedInUserDetail();
      }
      this.repository.saveOrder(this.order).subscribe(order => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      }, error => {
        this.errorMessage = error;
      });
    } else {
      console.log("Invalid Form");
      this.errorMessage = "Form Data Invalid";
    }
  }

}
