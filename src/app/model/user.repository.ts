import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {RestDataSource} from "./rest.datasource";
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from "rxjs/operators";



@Injectable()
export class UserRepository {
  private loaded: boolean = false;
  private hasError: boolean = false;
  loggedInUser = new User();
  userDetail = new User();

  constructor(private dataSource: RestDataSource) {}

  loadUser() {
    console.log(" load user");
    this.loggedInUser = JSON.parse(sessionStorage.getItem('userdetails'));
    console.log("Logged in user"+this.loggedInUser);
    if(this.loggedInUser) {
      console.log(this.loggedInUser);
      this.dataSource.getUserByName(this.loggedInUser.username).subscribe(
        user => {
        console.log("Success");
        this.loaded = true;
        this.userDetail = user;
        }, error => {
          this.hasError = true;
          console.log(error);
        });
    }
  }


  /**
   *
   * @returns Checking for this.loaded is good idea as whenever subscribe methods is called (for example from upper components)
   * http request is send to servers and if not careful it will drain both UI and server.
   * If we include expresion (method) in Template, angular repeatedly evaluate that expresion and resulting the method call repeatedly
   */
  getUser(): User {
    if (!this.loaded && !this.hasError) {
      console.log("getUser load user");
      this.loadUser();
    }
    return this.userDetail;
  }


  saveUser(user: User): Observable<User> {
    if (user.id == null || user.id == 0) {
      return this.dataSource.saveUser(user).pipe(
        map((value: User) =>{
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



}
