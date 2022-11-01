import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { ProductTableComponent } from "./productTable.component";
import { ProductEditorComponent } from "./productEditor.component";
import { OrderTableComponent } from "./orderTable.component";
import { AuthKeyCloakGuard } from "./authkeycloak.guard";

let routing = RouterModule.forChild([
  {path: "auth", component: AuthComponent},
  {path: "main", component: AdminComponent, canActivate: [AuthKeyCloakGuard],data: {roles: ['ADMIN']},
  children: [
   {path: "products/:mode/:id", component: ProductEditorComponent},
   {path: "products/:mode", component: ProductEditorComponent},
   {path: "products", component: ProductTableComponent},
   {path: "orders", component: OrderTableComponent},
   {path: "**", redirectTo: "products"}
  ]},
  {path: "**", redirectTo: "auth"}
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [],
  declarations: [AuthComponent, AdminComponent, ProductTableComponent, ProductEditorComponent, OrderTableComponent]
})
export class AdminModule {}
