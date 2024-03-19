import {Component} from "@angular/core";
import { User } from "../../model/user.model";
import { NgForm } from "@angular/forms";
import { UserRepository } from "../../model/user.repository";
import { ActivatedRoute } from "@angular/router";

import { PATH_USER_CODE_URL } from "../../service/constants";
import { PATH_SUBSCRIPTION_CODE_URL } from "../../service/constants";
import { PATH_PASSWORD_RESET_CODE_URL } from "../../service/constants";
import { Subscription } from "../../model/subscription.model";



@Component({
  templateUrl: "emailConfirmation.component.html",
  styleUrls: ["emailConfirmation.component.css"]
})
export class EmailConfirmationComponent {

  user: User = new User();
  sub: Subscription = new Subscription();

  public errorMessage: string;
  public successMessage: string;

  public lastUrlPath: string;
  public pathUserCodeUrl: string;
  public pathSubCodeUrl: string;
  public passRestCodeUrl: string;

  constructor(private userRepository: UserRepository, private route: ActivatedRoute) {
    this.lastUrlPath = this.route.snapshot.url[this.route.snapshot.url.length -1 ].path;
    this.pathUserCodeUrl = PATH_USER_CODE_URL;
    this.pathSubCodeUrl = PATH_SUBSCRIPTION_CODE_URL;
    this.passRestCodeUrl = PATH_PASSWORD_RESET_CODE_URL;
  }

  postComment(form: NgForm) {
    if (form.valid) {
      if (this.lastUrlPath.toLowerCase() === this.pathUserCodeUrl.toLowerCase()) {
        this.confirmUserEmailCode(form);
      } else if (this.lastUrlPath.toLocaleLowerCase() === this.pathSubCodeUrl.toLocaleLowerCase()) {
        this.confirmSubEmailCode(form);
      }
    } else {
      this.errorMessage = "Form Data Invalid";
    }

  }

  confirmUserEmailCode(form: NgForm): void {
    this.userRepository.confirmUserEmailCode(this.user).subscribe(response => {
      console.log(response.message);
      this.successMessage = response.message;
      this.errorMessage = null;
      form.reset();
    }, error=> {
      this.errorMessage = error;
      this.successMessage = null;
    })
  }

  confirmSubEmailCode(form: NgForm): void {
    this.userRepository.confirmSubEmailCode(this.sub).subscribe(response => {
      this.successMessage = response.message;
      this.errorMessage = null;
      form.reset();
    }, error=> {
      this.errorMessage = error;
      this.successMessage = null;
    })
  }

  getWindowInnerHeight():number {
    return window.innerHeight;
  }

  getMainContainerHeight():number {
    return document.querySelector('#main-container').clientHeight;
  }

  getOptimalMainContainerHeight():string {
    if (this.getMainContainerHeight() >= this.getWindowInnerHeight()) {
      let pixel = this.getMainContainerHeight();
     console.log(`height to set to main container as it is bigger than window height ${pixel}, ${this.getWindowInnerHeight()}`);
      return pixel+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
     console.log(`height to set to main container as it is smaller than window height ${pixel} , ${this.getWindowInnerHeight()}`);

      return this.getWindowInnerHeight()+200+"px";
    }
  }






}
