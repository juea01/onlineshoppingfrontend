import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';



import {StoreModule} from "./store/store.module";
import {StoreComponent } from "./store/store.component";
import {CheckoutComponent } from "./store/checkout.component";
import {CartDetailComponent } from "./store/cartDetail.component";
import {RouterModule } from "@angular/router";
import {StoreFirstGuard} from "./storeFirst.guard";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { XhrInterceptor } from './interceptors/app.request.interceptor';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'shoppingdistrictdev',
        clientId: 'shoppingdistrictpublicclient'
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/myaccount/main'
      }, loadUserProfileAtStartUp: false
    });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, StoreModule,
    FormsModule,
    KeycloakAngularModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    RouterModule.forRoot([
      {path: "store", component: StoreComponent, canActivate: [StoreFirstGuard]},
      {path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      {path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard]},
      {path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule), canActivate: [StoreFirstGuard]},
      {path: "myaccount", loadChildren: () => import("./myaccount/myaccount.module").then(m => m.MyaccountModule), canActivate: [StoreFirstGuard]},
      {path: "**", redirectTo: "/store"},
    ]),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi : true
    },
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
