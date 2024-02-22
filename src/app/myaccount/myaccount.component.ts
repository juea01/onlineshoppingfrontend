import {OnInit, Component, Inject, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { User } from "../model/user.model";
import { UserRepository } from '../model/user.repository';
import { SubscriptionRepository } from '../model/Subscription.repository';
import { environment as docker_env_config } from 'src/environments/environment.docker';
import { SubCategory } from "../service/constants";


import { SharedState, SHARED_STATE } from "./sharedstate.model";
import { Observer, Observable } from "rxjs";


@Component({
  templateUrl: "myaccount.component.html",
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  progressBarValue = 90;
  userDetail = new User();
  errorMessage = null;
  public subCategoryEnum = null;
  public selectedSubCategory: any;
  public isSubjectComponentExist:  boolean = false;

  constructor(private keycloak: KeycloakService, private router: Router,
    private userRepository: UserRepository, private subscriptionRepo: SubscriptionRepository,
    @Inject(SHARED_STATE) public observer: Observer<SharedState>,
    @Inject(SHARED_STATE) public subjectStateEvent: Observable<SharedState>) {}

  ngOnInit(): void {
    this.userRepository.loadUserForUserDetail().subscribe(
      user => {
      console.log("Success loading user");
      this.userDetail = user;
      }, error => {
       console.log(`Error loading user ${error}`);
      });
      this.subCategoryEnum = SubCategory;
      this.selectedSubCategory = this.subCategoryEnum.Java;

      /**
       * Subscribe to event that trigger value change in sub Category
       */
      this.subjectStateEvent.subscribe(update => {
        if(update.isCreated != undefined) {
          this.isSubjectComponentExist = update.isCreated;
        }
      })
  }

  /**
   * This method is used to propagate chage to interested subscribers.
   * @param subCategory - Value could be Java, JavaScript etc..
   */
  setSubCategory(subCategory: string) {
    this.selectedSubCategory = subCategory;
    if(this.isSubjectComponentExist) {
      this.observer.next(new SharedState(subCategory));
    } else {
      //component has been destroyed. navigate there by url and Angular will create the component again
      this.navigateToSubject(subCategory);
    }

  }

  navigateToSubject(subCateogyr: string) {
    this.router.navigate([`/myaccount/main/practicetests/${subCateogyr}`]);
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
