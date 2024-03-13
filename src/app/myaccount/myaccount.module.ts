import {APP_INITIALIZER, NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./guards/auth/auth.component";
import { MyaccountComponent } from "./myaccount.component";
import { UserDetailTableComponent } from "./usermanagement/userDetailTable.component";
import { UserDetailEditorComponent } from "./usermanagement/userDetailEditor.component";
import { AuthKeyCloakGuard } from "./guards/auth/authkeycloak.guard";
import { UnsavedGuardService } from "./guards/unsaved-guard.service";

import { NavBarModule } from '../nav-bar/nav-bar.module';
import {ModelModule} from "../model/model.module";
import { ServiceModule } from '../service/service.module';

import { SubjectsComponent } from "./subjects/subjects.component";
import { QuestiondetailComponent } from './questiondetail/questiondetail.component';

import { MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './payment/success/success.component';
import { SHARED_STATE, SharedState } from "./sharedstate.model";
import { Subject } from "rxjs";



let routing = RouterModule.forChild([
  {path: "auth", component: AuthComponent},
  {path: "success", component: SuccessComponent},
  {path: "main", component: MyaccountComponent,
   canActivate: [AuthKeyCloakGuard],data: {roles: ['CUSTOMER', 'ADMIN']},
  children: [
   {path: "userdetails/:mode/:id", component: UserDetailEditorComponent},
   {path: "userdetails/:mode", component: UserDetailEditorComponent},
   {path: "userdetails", component: UserDetailTableComponent},
   {path: "practicetests/:subCategory", component: SubjectsComponent},
   {path: "practicetests", component: SubjectsComponent},
   {path: "subjectdetail/:id/:level/:isPremium", component: QuestiondetailComponent, canActivate: [AuthKeyCloakGuard],data: {roles: ['PREMIUM', 'ADMIN']}},
   //{path: "subjectdetail/:id/:level/:isPremium", component: QuestiondetailComponent, canActivate: [AuthKeyCloakGuard],data: {roles: ['PREMIUM', 'ADMIN']}, canDeactivate: [UnsavedGuardService]},
   {path: "subjectdetail/:id", component: QuestiondetailComponent},
   {path: "payment", component: PaymentComponent},
   {path: "**", redirectTo: "practicetests"}
  ]},
  {path: "**", redirectTo: "auth"}
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing, NavBarModule, ModelModule, ServiceModule, MatProgressBarModule, MatCardModule, MatIconModule],
  providers: [UnsavedGuardService,
    {provide: SHARED_STATE, useValue: new Subject<SharedState>()}
  ],
  declarations: [AuthComponent, MyaccountComponent, UserDetailTableComponent, UserDetailEditorComponent, SubjectsComponent, QuestiondetailComponent, PaymentComponent, SuccessComponent]
})
export class MyaccountModule {}
