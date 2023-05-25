import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";
import {UserRepository} from "../model/user.repository";
import { Subscription } from '../model/subscription.model';
import { TermsDialogComponent } from '../service/terms-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'my-dialog',
  templateUrl: './dialog.component.html',
  styleUrls:["./dialog.component.css"]
})
export class DialogComponent {
  firstName: string;
  subscription: Subscription = new Subscription();
  public errorMessage: string;


  constructor(private dialogRef: MatDialogRef<DialogComponent>, private userRepository: UserRepository, private dialog: MatDialog) {}

  postComment(form: NgForm) {
    if (form.valid) {
      this.openDialog(true);
    } else {
      this.errorMessage = "Form Data Invalid";
    }

  }

  cancel() {
    this.dialogRef.close();
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
        this.userRepository.saveSubscription(this.subscription).subscribe( result => {
          const data = { message: result.message };
          this.dialogRef.close(data)}
        )
      } else {
        this.errorMessage = "To subscribe, you need to accept our privacy policy and Website/Application terms of use.";
      }
    })
  }
}
