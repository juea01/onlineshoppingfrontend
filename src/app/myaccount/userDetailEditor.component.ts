import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from "../model/user.model";
import { UserRepository } from "../model/user.repository";
import { WindowSizeServiceService } from "../service/window-size-service.service";

@Component({
  templateUrl: "userDetailEditor.component.html",
  styleUrls: ["userDetail.component.css"]
})

export class UserDetailEditorComponent {

  public errorMessage: string;
  editing: boolean = false;
  user: User = new User();
  constructor(private repository: UserRepository, private router: Router, private activeRoute: ActivatedRoute, private windowSizeService: WindowSizeServiceService) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      Object.assign(this.user, repository.getUser()); //there is only one logged in user
    }
  }

   save(form: NgForm) {
    if (form.valid) {
      this.repository.saveUser(this.user).subscribe( ()=>{
        this.router.navigateByUrl("/myaccount/main/userdetails");
      }, error => {
        this.errorMessage = error;
      });
    }else {
      this.errorMessage = "Form Data Invalid";
    }
   }

   getWindowInnerWidth():number {
    return this.windowSizeService.getWindowInnerWidth();
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }

}
