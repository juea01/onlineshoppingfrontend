import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
})
export class TermsDialogComponent {

  public isAcceptDeclineButton: boolean;

  constructor(private dialogRef: MatDialogRef<TermsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("is accept decline"+data.isAcceptDecline);
    this.isAcceptDeclineButton = data.isAcceptDecline;
  }

  accept(): void {
    this.dialogRef.close(true);
  }

  decline(): void {
    this.dialogRef.close(false);
  }


}
