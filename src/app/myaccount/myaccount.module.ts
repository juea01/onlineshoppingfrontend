import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { MyaccountComponent } from "./myaccount.component";
import { AuthGuard} from "./auth.guard";
import { OrderTableComponent } from "./orderTable.component";
import { AuthKeyCloakGuard } from "./authkeycloak.guard";


let routing = RouterModule.forChild([
  {path: "auth", component: AuthComponent},
  {path: "main", component: MyaccountComponent
, canActivate: [AuthKeyCloakGuard],data: {roles: ['CUSTOMER', 'ADMIN']},
  children: [
   {path: "orders", component: OrderTableComponent},
   {path: "**", redirectTo: "orders"}
  ]},
  {path: "**", redirectTo: "auth"}
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, MyaccountComponent, OrderTableComponent]
})
export class MyaccountModule {}
