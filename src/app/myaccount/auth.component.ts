import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../model/auth.service';
import { User } from 'src/app/model/user.model';

import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";

@Component({
  templateUrl: "auth.component.html",
  styleUrls: ["auth.component.css"]
})

export class AuthComponent implements OnInit{
  user = new User();
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();


    if(this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName;
      window.sessionStorage.setItem("userdetails", JSON.stringify(this.user));
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }


}


// Following is not needed for Keycloak login service
// export class AuthComponent {
//   public errorMessage: string;
//   authStatus: string;
//   public model = new User();


//   constructor(private router: Router, private auth: AuthService) {}

//   authenticate(form: NgForm) {
//     // if (form.valid) {
//     //   this.auth.authenticateUser(this.model)
//     //     .subscribe(response => {
//     //       if(response) {
//     //         this.router.navigateByUrl("/myaccount/main");
//     //       }
//     //       this.errorMessage = "Authentication Failed";
//     //     })

//     // } else {
//     //   this.errorMessage = "Form Data Invalid";
//     // }

//     if (form.valid) {
//       this.auth.authenticateUser(this.model)
//         .subscribe(response => {
//           window.sessionStorage.setItem("Authorization", response.headers.get('Authorization'));
//           this.model = <any> response.body;
//           this.model.authStatus = 'AUTH';
//           window.sessionStorage.setItem("userdetails", JSON.stringify(this.model));

//           //this block is related to csrf and if used JWT token then not needed
//           // let xsrf = this.getCookie('XSRF-TOKEN');
//           // window.sessionStorage.setItem("XSRF-TOKEN", xsrf);

//           this.router.navigateByUrl("/myaccount/main");
//         }, error => {
//           this.errorMessage = "Authentication Failed";
//           console.log(error);
//         });
//     }
//   }

//   getCookie(name) {
//     let cookie = {};
//     document.cookie.split(';').forEach(el => {
//       let [k,v] = el.split('=');
//       cookie[k.trim()] = v;
//     })
//     return cookie[name];
//   }

// }
