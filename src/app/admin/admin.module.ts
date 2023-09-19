import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { ProductTableComponent } from "./productTable.component";
import { ProductEditorComponent } from "./productEditor.component";
import { ArticleEditorComponent } from "./articleEditor.component";
import { AuthKeyCloakGuard } from "./authkeycloak.guard";

import { ArticleTableComponent } from "./articleTable.component";
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { SubjectComponent } from './subject/subject.component';
import { ServiceModule } from '../service/service.module';
import { SubjectEditorComponent } from './subject/subject-editor/subject-editor.component';
import { QuestionAnswerEditorComponent } from './question-answer/question-answer-editor/question-answer-editor.component';

let routing = RouterModule.forChild([
  {path: "auth", component: AuthComponent},
  {path: "main", component: AdminComponent, canActivate: [AuthKeyCloakGuard],data: {roles: ['ADMIN', 'LECTURER']},
  children: [
   {path: "products/:mode/:id", component: ProductEditorComponent},
   {path: "products/:mode", component: ProductEditorComponent},
   {path: "products", component: ProductTableComponent},
   {path: "articles/:mode/:id", component: ArticleEditorComponent},
   {path: "articles/:mode", component: ArticleEditorComponent},
   {path: "articles", component: ArticleTableComponent},
   {path: "subjects/:mode/:id", component: SubjectEditorComponent},
   {path: "subjects/:mode", component: SubjectEditorComponent},
   {path: "subjects", component: SubjectComponent},
   {path: "questions/:mode/:id/:questionId", component: QuestionAnswerComponent},
   {path: "questions/:mode/:id", component: QuestionAnswerComponent},
   {path: "questions/:mode", component: QuestionAnswerComponent},
   {path: "questionanswereditor/:id", component: QuestionAnswerEditorComponent},
   {path: "**", redirectTo: "articles"}
  ]},
  {path: "**", redirectTo: "auth"}
]);

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, routing, NavBarModule, ServiceModule],
  providers: [],
  declarations: [AuthComponent, AdminComponent, ProductTableComponent, ProductEditorComponent, ArticleTableComponent, ArticleEditorComponent, QuestionAnswerComponent, SubjectComponent, SubjectEditorComponent, QuestionAnswerEditorComponent]
})
export class AdminModule {}
