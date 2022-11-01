import {Component} from "@angular/core";
import { Cart } from "../model/cart.model";
import { ConnectionService } from "../model/connection.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: "cartDetail.component.html",
  styleUrls: ["cardDetail.component.css"]
})
export class CartDetailComponent{
  public connected: boolean = true;

  constructor(public cart: Cart, private connection: ConnectionService, private router: Router){
    this.connected = this.connection.connected;
    connection.Changes.subscribe((state) => this.connected = state);
  }

  public navigateToLogin() {
    window.sessionStorage.setItem("loggedInAndCheckout","true");
    this.router.navigate(['myaccount']);
  }

}
