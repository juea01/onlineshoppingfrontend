import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'my-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./articledetail.component.css']
})
export class DialogComponent {
  comment: string;
  status: string;


  constructor(private dialogRef: MatDialogRef<DialogComponent>) {}

  postComment(form: NgForm) {
    if (form.valid) {
      const data = { comment: this.comment };
    this.dialogRef.close(data);
    }

  }

  cancel() {
    this.dialogRef.close();
  }
}
