import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {ApiResponse} from "./apiResponse.model";
import {Subscription} from "./subscription.model";
import {RestDataSource} from "./rest.datasource";
import { Observable, throwError, of } from "rxjs";
import {  map } from "rxjs/operators";
import { KeycloakService } from 'keycloak-angular';



@Injectable()
export class UserRepository {
  private loaded: boolean = false;
  private hasError: boolean = false;
  loggedInUser = new User();
  userDetail = new User();

  constructor(private dataSource: RestDataSource, private keyCloakService: KeycloakService) {}

  // loadUser() {
  //   console.log(" load user");
  //   this.loggedInUser = JSON.parse(sessionStorage.getItem('userdetails'));
  //   console.log("Logged in user"+this.loggedInUser);
  //   if(this.loggedInUser) {
  //     console.log(this.loggedInUser);
  //     this.dataSource.getUserByName(this.loggedInUser.username).subscribe(
  //       user => {
  //       console.log("Success");
  //       this.loaded = true;
  //       this.userDetail = user;
  //       }, error => {
  //         this.hasError = true;
  //         console.log(error);
  //       });
  //   }
  // }



  /**
   *
   * This method is called from UserDetail page as when the flow reach to the point user should have been logged in.
   * Also called from article detail page to check whether or not to allow user to post comment.
   */
  loadUserForUserDetail(): Observable<User> {
    return new Observable( observer => {

      this.loggedInUser = JSON.parse(sessionStorage.getItem('userdetails'));
      this.keyCloakService.isLoggedIn().then((value)=>{

        if (!value) {
          observer.error("Error- no logged in user yet.");
        } else {

            if (!this.userDetail.username) {
              this.keyCloakService.loadUserProfile().then((profile)=> {
                this.dataSource.getUserByName(profile.username).subscribe(data => {
                  this.userDetail = data;
                  observer.next(data);
                  observer.complete();
                })
              })

            } else {
              observer.next(this.userDetail);
              observer.complete();
            }

         }

      }).catch((error)=> {
        console.log("Error"+error);
      })


    });
  }


  /**
   *
   * This method is called from UserDetailEditor page as when the flow reach to the point user should have been logged in and user detail has been
   * loaded.
   */
  getUser(): User {
    return this.userDetail;
  }

  storeLoggedInUserToSession(user: User) {
    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
  }

  /**
   * This method is intended to be called when keycloak user logut button is called
   */
  clearUserData() {
    window.sessionStorage.setItem("userdetails",null);
    this.loggedInUser = null;
    this.userDetail = null;
  }


  saveUser(user: User): Observable<ApiResponse<null>> {
    if (user.id == null || user.id == 0) {
      return this.dataSource.saveUser(user).pipe(
        map((value: User) =>{
          return new ApiResponse<null>("User created successfully.",null);
        }));
    } else {
      return this.dataSource.updateUser(user).pipe(
        map((value: User) =>{
          this.userDetail = user;
          return new ApiResponse<null>("User updated successfully.",null);
        })
      );
    }

  }


  saveSubscription(subscription: Subscription): Observable<ApiResponse<null>> {
      return this.dataSource.saveSubscription(subscription);
  }

  isSubscriptionEmailUnique(email: string): Observable<boolean> {
    return  this.dataSource.isSubscriptionEmailUnique(email);
  }

  isUserEmailUnique(email: string): Observable<boolean> {
    return  this.dataSource.isUserEmailUnique(email);
  }

  confirmUserEmailCode(user: User): Observable<ApiResponse<null>> {
    return this.dataSource.confirmUserEmailCode(user);
  }

  confirmSubEmailCode(subscription: Subscription): Observable<ApiResponse<null>> {
    return this.dataSource.saveSubscriptionEmailCode(subscription);
  }



  isUserNameUnique(username: string): Observable<boolean> {
    return  this.dataSource.isUserNameUnique(username);
  }



}
