import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {ApiResponse} from "./apiResponse.model";
import {Subscription} from "./subscription.model";
import {RestDataSource} from "./rest.datasource";
import { Observable, throwError, of } from "rxjs";
import {  map } from "rxjs/operators";



@Injectable()
export class UserRepository {
  private loaded: boolean = false;
  private hasError: boolean = false;
  loggedInUser = new User();
  userDetail = new User();

  constructor(private dataSource: RestDataSource) {}

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
   */
  loadUserForUserDetail(): Observable<User> {
    return new Observable( observer => {
      this.loggedInUser = JSON.parse(sessionStorage.getItem('userdetails'));
      if (!this.loggedInUser) {
        observer.error("Error- can't get user detail from session storage!");
      } else {
        if (!this.userDetail.username) {
          this.dataSource.getUserByName(this.loggedInUser.username).subscribe(data => {
            this.userDetail = data;
            observer.next(data);
            observer.complete();
          })
        } else {
          observer.next(this.userDetail);
          observer.complete();
        }
       }

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


  saveUser(user: User): Observable<User> {
    if (user.id == null || user.id == 0) {
      return this.dataSource.saveUser(user).pipe(
        map((value: User) =>{
          this.userDetail = user;
          return value;
        }));
    } else {
      return this.dataSource.updateUser(user).pipe(
        map((value: User) =>{
          this.userDetail = user;
          return value;
        })
      );
    }

  }


  saveSubscription(subscription: Subscription): Observable<ApiResponse<null>> {
      return this.dataSource.saveSubscription(subscription);
  }

  isUserEmailUnique(email: string): Observable<boolean> {
    return  this.dataSource.isUserEmailUnique(email);
  }



  isUserNameUnique(username: string): Observable<boolean> {
    return  this.dataSource.isUserNameUnique(username);
  }



}
