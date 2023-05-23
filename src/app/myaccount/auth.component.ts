import { Component, OnInit } from "@angular/core";
import { User } from 'src/app/model/user.model';

import { KeycloakService } from "keycloak-angular";
import Keycloak, { KeycloakProfile } from "keycloak-js";


@Component({
  templateUrl: "auth.component.html",
  selector: 'authComponent',
  styleUrls: ["auth.component.css"]
})

export class AuthComponent implements OnInit{
  user = new User();
  public isLoggedIn = false;
  public isTokenExpired = false;

  public userProfile: KeycloakProfile | null = null;
  public userCreationSuccess: boolean = false;

  constructor(private readonly keycloak: KeycloakService) {

  }

  public async ngOnInit() {

    if ("true" === window.sessionStorage.getItem("userRegistrationSuccess")){
      this.userCreationSuccess = true;
      console.log("user creation success is set to true");
      window.sessionStorage.setItem("userRegistrationSuccess","false");
    } else {
      this.userCreationSuccess = false;
    }

    this.isLoggedIn = await this.keycloak.isLoggedIn();


    if (!this.isLoggedIn) {
      console.log("User has been logged in"+ this.isLoggedIn);
      this.keycloak.clearToken();

    }
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
    if ("true" === window.sessionStorage.getItem("navigatedFromarticleDetail")){
      window.sessionStorage.setItem("navigatedFromarticleDetail","false");
      let articleId = window.sessionStorage.getItem("articleId");
      window.sessionStorage.setItem("articleId","0");
      this.keycloak.login({"redirectUri":`http://${location.hostname}:80/articleDetail/${articleId}`});
    } else {
     this.keycloak.login({"redirectUri":`http://${location.hostname}:80/myaccount/main`});
    }

  }
}

