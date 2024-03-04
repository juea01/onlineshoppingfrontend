import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';



import {StoreModule} from "./store/store.module";
import {StoreComponent } from "./store/store.component";
import {AboutUsComponent } from "./store/aboutUs.component";
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './store/productDetail.component';
import { EmailConfirmationComponent } from './store/emailConfirmation.component';



import {ArticleComponent} from "./articles/article.component";
import {ArticleDetailComponent} from "./articles/articledetail.component";
import {DialogComponent} from "./articles/dialog.component";



import {RouterModule } from "@angular/router";
//import {StoreFirstGuard} from "./storeFirst.guard";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavBarModule} from './nav-bar/nav-bar.module';

import { XhrInterceptor } from './interceptors/app.request.interceptor';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MatDialogModule} from "@angular/material/dialog";
import { MatProgressBarModule} from "@angular/material/progress-bar";

import { ServiceModule } from './service/service.module';
import {ModelModule} from "./model/model.module";
import { environment as docker_env_config } from 'src/environments/environment.docker';


/**
 *
 * if loadUserProfileAtStartUp option is true mean, user will be redirected to login page once application is started
 */

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: docker_env_config.KeycloakUrl,
        realm: docker_env_config.keycloakRelam,
        clientId: docker_env_config.keycloakClientId
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: `${docker_env_config.keycloakRedirectUrl}/myaccount/main`
      }, loadUserProfileAtStartUp: false
    });
}


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ArticleComponent,
    ArticleDetailComponent,
    DialogComponent

  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, StoreModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    HttpClientModule,
    NavBarModule,
    MatDialogModule,
    MatProgressBarModule,
    ServiceModule,
    ModelModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    /**StoreFirstGuard is here so that user can only navigate through UI (not like pasting the specific page link in browser) */
    RouterModule.forRoot([
      //{path: "store", component: StoreComponent, canActivate: [StoreFirstGuard]},
      {path: "store", component: StoreComponent},
      {path: "aboutUs", component: AboutUsComponent},
      {path: "productDetail/:id", component: ProductDetailComponent},
      {path: "productDetail", component: ProductDetailComponent},
      {path: 'emailConfirmation/:code', component: EmailConfirmationComponent},

      {path: "article/:subcategory", component: ArticleComponent},
      {path: "article", component: ArticleComponent},
      {path: "articleDetail/:id", component: ArticleDetailComponent},
      {path: "articleDetail", component: ArticleDetailComponent},

      {path: "registration", component: RegistrationComponent},
      {path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)},
      {path: "myaccount", loadChildren: () => import("./myaccount/myaccount.module").then(m => m.MyaccountModule)},
      {path: "**", redirectTo: "/store"},
    ]),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass: XhrInterceptor,
    //   multi : true
    // },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
  //  StoreFirstGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
