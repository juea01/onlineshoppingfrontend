import { Injectable} from "@angular/core";
import { Cart  } from "./cart.model";
import { User } from "./user.model";


@Injectable()
export class Order {
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public phone: string;
  public address: string;
  public city: string;
  public state: string;
  public postalCode: number;
  public country: string;
  public shipped: boolean = false;
  public emailPromotion: boolean = true;
  public user: User;

  constructor(public cart: Cart){

  }

  clear() {
    this.id = null;
    this.firstname = this.lastname = this.address = this.city = null;
    this.state = this.postalCode = this.country = null;
    this.shipped = false;
    this.cart.clear();
  }

}
