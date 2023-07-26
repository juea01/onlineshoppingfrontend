import { Component, OnInit } from '@angular/core';
import { TermsDialogComponent } from '../../service/terms-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

}
