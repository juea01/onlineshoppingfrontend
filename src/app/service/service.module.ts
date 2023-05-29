import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import { TermsDialogComponent } from "./terms-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { UniqueUsernameValidatorDirective } from "./uniqueUsernameValidator.directive";
import { UniqueUseremailValidatorDirective } from "./uniqueUseremailValidator.directives";

@NgModule({
  imports: [CommonModule, MatDialogModule],
  declarations: [TermsDialogComponent, UniqueUsernameValidatorDirective, UniqueUseremailValidatorDirective],
  exports: [TermsDialogComponent, UniqueUsernameValidatorDirective, UniqueUseremailValidatorDirective]
})
export class ServiceModule {}
