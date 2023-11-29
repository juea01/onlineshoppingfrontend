import { Component, OnInit } from "@angular/core";

import { User } from 'src/app/model/user.model';

import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
import { environment as docker_env_config } from 'src/environments/environment.docker';

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

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
      this.login();
  }

  public login() {
    this.keycloak.login({
      redirectUri:`${docker_env_config.keycloakRedirectUrl}/admin/main`
    });
  }

}



