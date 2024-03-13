import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserRepository } from "../model/user.repository";
import { User} from "../model/user.model";
import { TermsDialogComponent } from '../service/terms-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionService } from '../service/subscription.service';
import * as _ from 'lodash';

@Component({
  templateUrl: "registration.component.html",
  styleUrls: ["registration.component.css"]
})
export class RegistrationComponent implements OnInit{

  public errorMessage: string;
  user: User = new User();

  constructor(private router: Router, private repository: UserRepository,
    private dialog: MatDialog, private subscriptionService: SubscriptionService) {

  }

  ngOnInit(): void {
    this.user.emailSubscription = true;
     //For new user who hasn't been logged in to my account page, let user go to subscribe page again after logging in.
     //Redirecting payment page directly after logging in may confuse first time user
     if(!_.isEmpty(this.subscriptionService.getSelectedPriceId())) {
      this.subscriptionService.resetSelectedPriceId();
    }
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      this.openDialog(true);
    } else {
      this.errorMessage = "Form Data Invalid";
    }
  }

  opensTermsDialog(event: Event): void {
    event.preventDefault();
    const dialogConfig = {
      data: {
        isAcceptDecline: false
      }
    };

    this.dialog.open(TermsDialogComponent, dialogConfig);
  }

  openDialog(isAcceptDeclineReq: boolean) {

    const dialogConfig = {
      data: {
        isAcceptDecline: isAcceptDeclineReq
      }
    };
    const dialogRef=this.dialog.open(TermsDialogComponent, dialogConfig);

    //Return true if user accept terms and conditions otherwise false
   dialogRef.afterClosed().subscribe((result)=> {
      if(result) {
        this.user.acceptTermsConditions = result;
        this.repository.saveUser(this.user).subscribe( ()=>{
          window.sessionStorage.setItem("userRegistrationSuccess","true");
          this.router.navigateByUrl("/myaccount",);
        }, error => {
          this.errorMessage = error;
        });
      } else {
        this.errorMessage = "To register with us, you need to accept our privacy policy and Website/Application terms of use.";
      }
    })
  }

}
