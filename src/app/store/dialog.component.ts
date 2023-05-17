import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";
import {UserRepository} from "../model/user.repository";
import { Subscription } from '../model/subscription.model';

@Component({
  selector: 'my-dialog',
  templateUrl: './dialog.component.html',
  styleUrls:["./dialog.component.css"]
})
export class DialogComponent {
  firstName: string;
  subscription: Subscription = new Subscription();


  constructor(private dialogRef: MatDialogRef<DialogComponent>, private userRepository: UserRepository) {}

  postComment(form: NgForm) {
    if (form.valid) {
      // const data = { comment: this.comment };
      console.log("Successfully subscribed");
      this.userRepository.saveSubscription(this.subscription).subscribe( result => {
        const data = { message: result.message };
        this.dialogRef.close(data)}
      )
    }

  }

  cancel() {
    this.dialogRef.close();
  }
}
