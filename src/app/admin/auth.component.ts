import { Component, OnInit } from "@angular/core";

import { User } from 'src/app/model/user.model';

import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
import { environment as docker_env_config } from 'src/environments/environment.docker';

import { WindowSizeServiceService } from "../service/window-size-service.service";

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

  constructor(private readonly keycloak: KeycloakService, private windowSizeService: WindowSizeServiceService) {}

  public async ngOnInit() {

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
    console.log("going to keycloak login page");
    this.keycloak.login({
      redirectUri:`${docker_env_config.keycloakRedirectUrl}/admin/main`
    });
  }


  getWindowInnerWidth():number {
    return this.windowSizeService.getWindowInnerWidth();
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }

}



