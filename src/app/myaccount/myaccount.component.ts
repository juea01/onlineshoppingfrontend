import {Component} from "@angular/core";
import {Router} from "@angular/router";
import { AuthService} from "../model/auth.service";

@Component({
  templateUrl: "myaccount.component.html"
})
export class MyaccountComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.clear();
    this.router.navigateByUrl("/");
  }

}
