import {Component} from "@angular/core";
import { User } from "../model/user.model";
import { NgForm } from "@angular/forms";
import { UserRepository } from "../model/user.repository";


@Component({
  templateUrl: "emailConfirmation.component.html",
  styleUrls: ["emailConfirmation.component.css"]
})
export class EmailConfirmationComponent {

  user: User = new User();
  public errorMessage: string;


  constructor(private userRepository: UserRepository) {

  }

  postComment(form: NgForm) {
    if (form.valid) {
      this.userRepository.confirmUserEmailCode(this.user).subscribe(response => {
        this.errorMessage = response.message;
      }, error=> {
        this.errorMessage = error.message;
      })
    } else {
      this.errorMessage = "Form Data Invalid";
    }

  }






}
