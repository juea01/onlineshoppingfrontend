import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'my-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./articledetail.component.css']
})
export class DialogComponent {
  public comment: string;
  status: string;


  constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.comment = data.comment;
  }

  postComment(form: NgForm) {
    if (form.valid) {
      console.log("post button")
    const data = { comment: this.comment };
    this.dialogRef.close(data);
    }

  }

  cancel() {
    console.log("Cancel button")
    this.dialogRef.close();
  }
}
