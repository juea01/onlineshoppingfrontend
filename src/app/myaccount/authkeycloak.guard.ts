import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { User } from '../model/user.model';
import { KeycloakProfile } from 'keycloak-js';
import { UserRepository } from '../model/user.repository';
import { environment as docker_env_config } from 'src/environments/environment.docker';
import { ValueStoreService } from 'src/app/service/value-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthKeyCloakGuard extends KeycloakAuthGuard {
  user = new User();
  public userProfile: KeycloakProfile | null = null;
  isItemPremium = false;

  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService, private userRepository: UserRepository,
    private activatedRoute: ActivatedRoute, private valueStoreService: ValueStoreService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    //console.log(`Authenticated ${this.authenticated} and Token Expired ${this.keycloak.isTokenExpired()}`);
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated && !this.keycloak.isTokenExpired()) {
     // console.log("Not authenticated");
     // console.log("Rdirection after login"+docker_env_config.keycloakRedirectUrl +"state"+ state.url),
      await this.keycloak.login({

        redirectUri: docker_env_config.keycloakRedirectUrl + state.url,
      });
    }else{
      //  console.log(`Storing logged in user infor into session variable`);
        this.userProfile = await this.keycloak.loadUserProfile();
        this.user.authStatus = 'AUTH';
       // console.log(`user name ${this.userProfile.username}`);
        this.user.username = this.userProfile.username;
        this.user.email = this.userProfile.email;
        this.userRepository.storeLoggedInUserToSession(this.user);

        if ("true" === window.sessionStorage.getItem("loggedInAndCheckout")){
          window.sessionStorage.setItem("loggedInAndCheckout","false");
          this.router.navigate(['checkout']);
        }
    }


    // Get the roles required from the route.
    const requiredRoles = route.data.roles;
   // console.log("Required roles",requiredRoles);
   // console.log("Roles user has"+this.roles);





    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      //console.log("No additional roles are required");
      return true;
    }

    /**
     * This is for routing to exercises that require PREMIUM user role for premium exercises.
     * */
    if (requiredRoles.includes("PREMIUM")) {
      //console.log(`Is item premium ${this.isItemPremium}  ${this.activatedRoute.snapshot.params["isPremium"]} ${this.activatedRoute.snapshot.params["id"]}`);
      this.isItemPremium = this.valueStoreService.getItemPremium();
      //console.log(`Is item premium ${this.isItemPremium}`);
      if (this.isItemPremium) {
        return requiredRoles.some((role)=> this.roles.includes(role));
      } else {
        //if item is not premium then PREMIUM role is not required
        return true;
      }
    }

    /* Allow the user to proceed if all the required roles are present.
    requiredRoles are role that are required (configured) at myaccount.module.ts
    this.roles are roles user has at keycloak server.
    */
    return requiredRoles.some((role) => this.roles.includes(role));
  }
}
