import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import { TermsDialogComponent } from "./terms-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [TermsDialogComponent],
  exports: [TermsDialogComponent]
})
export class ServiceModule {}
