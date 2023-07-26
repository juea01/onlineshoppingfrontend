import {APP_INITIALIZER, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { MyaccountComponent } from "./myaccount.component";
import { AuthGuard} from "./auth.guard";
import { UserDetailTableComponent } from "./userDetailTable.component";
import { UserDetailEditorComponent } from "./userDetailEditor.component";
import { AuthKeyCloakGuard } from "./authkeycloak.guard";

import { NavBarModule } from '../nav-bar/nav-bar.module';
import { SubjectsComponent } from "./subjects/subjects.component";
import { QuestiondetailComponent } from './questiondetail/questiondetail.component';

import { MatProgressBarModule} from "@angular/material/progress-bar";



let routing = RouterModule.forChild([
  {path: "auth", component: AuthComponent},
  {path: "main", component: MyaccountComponent,
   canActivate: [AuthKeyCloakGuard],data: {roles: ['CUSTOMER', 'ADMIN']},
  children: [
   {path: "userdetails/:mode/:id", component: UserDetailEditorComponent},
   {path: "userdetails/:mode", component: UserDetailEditorComponent},
   {path: "userdetails", component: UserDetailTableComponent},
   {path: "practicetests", component: SubjectsComponent},
   {path: "subjectdetail/:id", component: QuestiondetailComponent},
   {path: "**", redirectTo: "userdetails"}
  ]},
  {path: "**", redirectTo: "auth"}
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, NavBarModule, MatProgressBarModule],
  providers: [AuthGuard],
  declarations: [AuthComponent, MyaccountComponent, UserDetailTableComponent, UserDetailEditorComponent, SubjectsComponent, QuestiondetailComponent]
})
export class MyaccountModule {}
