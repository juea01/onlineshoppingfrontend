import {Injectable} from "@angular/core";
import { Product} from "./product.model";

@Injectable()
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  addLine(product: Product, quantity: number = 1) {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.itemCount += quantity;
     // line.linePrice = (+(product.price * quantity).toFixed(2));
    } else {
     // this.lines.push(new CartLine(product,quantity,+(product.price * quantity).toFixed(2)));
    }
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number) {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      line.itemCount = Number(quantity);
    //  line.linePrice = (+(product.price * quantity).toFixed(2));
    } else {
    //  this.lines.push(new CartLine(product,quantity, (+(product.price * quantity).toFixed(2))));
    }
    this.recalculate();
  }

  removeLine(id: number) {
    let index = this.lines.findIndex(line => line.product.id == id);
    this.lines.splice(index,1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }


  private recalculate() {
    console.log("cart price recalculate");
    this.itemCount = 0;
    this.cartPrice = 0;
    let price: number = 0;
    this.lines.forEach(l => {
      this.itemCount += l.itemCount;

   //   price = (+(l.itemCount * l.product.price).toFixed(2));
      console.log("Price"+price);
      console.log("Cart Price Before"+this.cartPrice);
      this.cartPrice = +(this.cartPrice +price).toFixed(2);
      console.log("Cart Price After"+this.cartPrice);
    })
  }

}

export class CartLine {
  constructor(public product: Product, public itemCount: number, public linePrice: number) {}

  get lineTotal() {
    return this.linePrice;
  }
}
