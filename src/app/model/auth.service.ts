import {Injectable} from "@angular/core";
import { Observable} from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";

@Injectable()
export class AuthService {

  constructor(private datasource: RestDataSource) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.datasource.authenticate(username, password);
  }

  authenticateUser(user: User) {
    return this.datasource.authenticateUser(user);
  }

  get authenticated(): boolean {
    return this.datasource.auth_token != null;
  }

  clear() {
    this.datasource.auth_token = null;
    window.sessionStorage.setItem('XSRF-TOKEN', null);
    window.sessionStorage.setItem("userdetails", null);
  }

}
