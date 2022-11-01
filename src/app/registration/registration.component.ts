import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute} from "@angular/router";
import { UserRepository } from "../model/user.repository";
import { User} from "../model/user.model";

@Component({
  templateUrl: "registration.component.html",
  styleUrls: ["registration.component.css"]
})
export class RegistrationComponent {



  public errorMessage: string;



  user: User = new User();


  constructor(private router: Router, activeRoute: ActivatedRoute, private repository: UserRepository) {
    this.user.country = "New Zealand";
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      console.log("Valid Form");
        this.repository.saveUser(this.user).subscribe( ()=>{
          window.sessionStorage.setItem("userRegistrationSuccess","true");
          this.router.navigateByUrl("/myaccount",);
        }, error => {
          this.errorMessage = error;
        });

    } else {
      console.log("Invalid Form");
      this.errorMessage = "Form Data Invalid";
    }
  }

}
