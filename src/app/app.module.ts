import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';



import {StoreModule} from "./store/store.module";
import {StoreComponent } from "./store/store.component";
import {CheckoutComponent } from "./store/checkout.component";
import {CartDetailComponent } from "./store/cartDetail.component";
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './store/productDetail.component';


import {ArticleComponent} from "./articles/article.component";
import {ArticleDetailComponent} from "./articles/articledetail.component";
import {DialogComponent} from "./articles/dialog.component";



import {RouterModule } from "@angular/router";
import {StoreFirstGuard} from "./storeFirst.guard";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavBarModule} from './nav-bar/nav-bar.module';

import { XhrInterceptor } from './interceptors/app.request.interceptor';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MatDialogModule} from "@angular/material/dialog";

/**
 *
 * if loadUserProfileAtStartUp option is true mean, user will be redirected to login page once application is started
 */

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: `http://${location.hostname}:8080`,
        realm: 'shoppingdistrictdev',
        clientId: 'shoppingdistrictpublicclient'
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: `http://${location.hostname}:80/myaccount/main`
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
    KeycloakAngularModule,
    HttpClientModule,
    NavBarModule,
    MatDialogModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    /**StoreFirstGuard is here so that user can only navigate through UI (not like pasting the specific page link in browser) */
    RouterModule.forRoot([
      {path: "store", component: StoreComponent, canActivate: [StoreFirstGuard]},
      {path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      {path: "checkout", component: CheckoutComponent},
      {path: "productDetail/:id", component: ProductDetailComponent},
      {path: "productDetail", component: ProductDetailComponent},

      {path: "article/:subcategory", component: ArticleComponent, canActivate: [StoreFirstGuard]},
      {path: "articleDetail/:id", component: ArticleDetailComponent},
      {path: "articleDetail", component: ArticleDetailComponent},

      {path: "registration", component: RegistrationComponent, canActivate: [StoreFirstGuard]},
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
    StoreFirstGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
