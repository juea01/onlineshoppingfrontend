import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { UserRepository } from "../model/user.repository";
import { User} from "../model/user.model";
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
  templateUrl: "registration.component.html",
  styleUrls: ["registration.component.css"]
})
export class RegistrationComponent {



  public errorMessage: string;



  user: User = new User();


  constructor(private router: Router, activeRoute: ActivatedRoute, private repository: UserRepository) {

  }

  authenticate(form: NgForm) {
    if (form.valid) {
        this.repository.saveUser(this.user).subscribe( ()=>{
          window.sessionStorage.setItem("userRegistrationSuccess","true");
          this.router.navigateByUrl("/myaccount",);
        }, error => {
          this.errorMessage = error;
        });
        this.errorMessage = "Valid form";
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }

}
