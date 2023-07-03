import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { User } from '../model/user.model';
import { KeycloakProfile } from 'keycloak-js';
import { environment as docker_env_config } from 'src/environments/environment.docker';

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
    if ( !this.keycloak.isLoggedIn) {
      console.log("Not authenticated");
      await this.keycloak.login({
        redirectUri: docker_env_config.keycloakRedirectUrl + state.url,
      });
    }else{
        this.userProfile = await this.keycloak.loadUserProfile();
        this.user.authStatus = 'AUTH';
        this.user.username = this.userProfile.username;
        this.user.email = this.userProfile.email;
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));
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
    requiredRoles are role that are required (configured) at admin.module.ts
    this.roles are roles user has at keycloak server.
    */
    let hasRequiredRole = requiredRoles.some((role) => this.roles.includes(role));
    if (hasRequiredRole) {
      return hasRequiredRole;
    } else {
      // don't have admin privilege, redirect to customer page
      this.router.navigateByUrl('/myaccount/main');
    }
  }
}
