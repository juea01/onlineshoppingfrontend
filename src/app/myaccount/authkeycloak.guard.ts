import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { User } from '../model/user.model';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthKeyCloakGuard extends KeycloakAuthGuard {
  user = new User();
  public userProfile: KeycloakProfile | null = null;
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      console.log("Not authenticated");
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }else{
        this.userProfile = await this.keycloak.loadUserProfile();
        this.user.authStatus = 'AUTH';
        this.user.username = this.userProfile.username;
        this.user.email = this.userProfile.email;
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));

        if ("true" === window.sessionStorage.getItem("loggedInAndCheckout")){
          window.sessionStorage.setItem("loggedInAndCheckout","false");
          this.router.navigate(['checkout']);
        }
    }

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;
    console.log("Required roles",requiredRoles);
    console.log("Roles user has"+this.roles);

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      console.log("No additional roles are required");
      return true;
    }

    /* Allow the user to proceed if all the required roles are present.
    requiredRoles are role that are required (configured) at myaccount.module.ts
    this.roles are roles user has at keycloak server.
    */
    return requiredRoles.some((role) => this.roles.includes(role));
  }
}
