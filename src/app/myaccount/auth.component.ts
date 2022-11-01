import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/model/user.model';

import { KeycloakService } from "keycloak-angular";
import Keycloak, { KeycloakProfile } from "keycloak-js";
import { Cart } from "../model/cart.model";

@Component({
  templateUrl: "auth.component.html",
  selector: 'authComponent',
  styleUrls: ["auth.component.css"]
})

export class AuthComponent implements OnInit{
  user = new User();
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  public userCreationSuccess: boolean = false;

  constructor(private readonly keycloak: KeycloakService, private cart: Cart) {}

  public async ngOnInit() {

    if ("true" === window.sessionStorage.getItem("userRegistrationSuccess")){
      this.userCreationSuccess = true;
      console.log("user creation success is set to true");
      window.sessionStorage.setItem("userRegistrationSuccess","false");
    } else {
      this.userCreationSuccess = false;
    }

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    console.log("User has been logged in"+ this.isLoggedIn);
    if(this.isLoggedIn) {
      console.log("User has been logged in");
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log("User Name"+ this.userProfile.username);
      this.user.authStatus = 'AUTH';
      this.user.username = this.userProfile.username;
      this.user.email = this.userProfile.email;
      window.sessionStorage.setItem("userdetails", JSON.stringify(this.user));
    }
  }

  public login() {
    if ("true" === window.sessionStorage.getItem("loggedInAndCheckout")){
      if (this.cart.itemCount > 0) {
        console.log("Storing cart");
        window.sessionStorage.setItem("ShoppingCart",JSON.stringify(this.cart));
      }

    }
    this.keycloak.login({"redirectUri":`http://${location.hostname}:80/myaccount/main`});
  }
}

