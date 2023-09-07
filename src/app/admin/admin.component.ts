import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { environment as docker_env_config } from 'src/environments/environment.docker';
import { WindowSizeServiceService } from "../service/window-size-service.service";

@Component({
  templateUrl: "admin.component.html"
})
export class AdminComponent {
  constructor(private keycloak: KeycloakService, private router: Router,  private windowSizeService: WindowSizeServiceService) {}

  /**
  * To use logout functionality provided by library (keycloak 8.3.0) compatible with Angular 9
  * We need to add --spi-login-protocol-openid-connect-legacy-logout-redirect-uri=true start when starting docker container.
  * Please see here -> https://www.keycloak.org/2022/04/keycloak-1800-released
  * Newer version of keycloak doesn't support redirect uri option anymore
  * Please see more, OpenID Connect Logout section (https://www.keycloak.org/2022/04/keycloak-1800-released)
  * Need to upgrade Angular as well as keycloak library
  */
  logout() {
    this.keycloak.logout(`${docker_env_config.keycloakRedirectUrl}`).then(()=> {
      this.keycloak.clearToken();
    })
  }

  getWindowInnerWidth():number {
    return this.windowSizeService.getWindowInnerWidth();
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }

}
