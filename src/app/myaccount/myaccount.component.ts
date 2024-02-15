import {OnInit, Component} from "@angular/core";
import {Router} from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { User } from "../model/user.model";
import { UserRepository } from '../model/user.repository';
import { SubscriptionRepository } from '../model/Subscription.repository';
import { environment as docker_env_config } from 'src/environments/environment.docker';
import { stringify } from "querystring";

@Component({
  templateUrl: "myaccount.component.html",
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  progressBarValue = 90;
  userDetail = new User();
  errorMessage = null;

  constructor(private keycloak: KeycloakService, private router: Router,
    private userRepository: UserRepository, private subscriptionRepo: SubscriptionRepository) {}

  ngOnInit(): void {
    this.userRepository.loadUserForUserDetail().subscribe(
      user => {
      console.log("Success loading user");
      this.userDetail = user;
      }, error => {
       console.log(`Error loading user ${error}`);
      });
  }

  navigateToPractice(level: number) {
    this.router.navigate(['/myaccount/main/practicetests']);
  }

 /**
  * To use logout functionality provided by library (keycloak 8.3.0) compatible with Angular 9
  * We need to add --spi-login-protocol-openid-connect-legacy-logout-redirect-uri=true start when starting docker container.
  * Please see here -> https://www.keycloak.org/2022/04/keycloak-1800-released
  * Newer version of keycloak doesn't support redirect uri option anymore
  * Please see more, OpenID Connect Logout section (https://www.keycloak.org/2022/04/keycloak-1800-released)
  * Need to upgrade Angular as well as keycloak library
  */
  logout() {
    this.userRepository.clearUserData();
    this.keycloak.logout(`${docker_env_config.keycloakRedirectUrl}`).then(()=> {
      this.keycloak.clearToken();
    })
  }

  manageBilling(){
    this.subscriptionRepo.manageBilling(this.userDetail.username).subscribe((result)=> {
      if(result.redirectView){
        if (result.url) {
          window.location.href = result.url;
        }
      } else {
        //TODO:this need to handle properly including working with backend for response message
        this.errorMessage="You can't manage billing as you don't have active payment subscription yet."
      }
    });
  }



}
