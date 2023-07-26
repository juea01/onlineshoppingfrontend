import {APP_INITIALIZER, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavBarComponent } from "./nav-bar.component";
import { RouterModule} from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "./footer/footer.component";


@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [NavBarComponent, FooterComponent],
  exports: [NavBarComponent, FooterComponent]
})
export class NavBarModule {}
