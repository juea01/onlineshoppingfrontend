import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {StoreModule} from "./store/store.module";
import {StoreComponent } from "./store/store.component";
import {CheckoutComponent } from "./store/checkout.component";
import {CartDetailComponent } from "./store/cartDetail.component";
import {RouterModule } from "@angular/router";
import {StoreFirstGuard} from "./storeFirst.guard";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ThreeDimensionViewComponent } from './3dview/3dview.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, StoreModule,
    RouterModule.forRoot([
      {path: "store", component: StoreComponent, canActivate: [StoreFirstGuard]},
      {path: "cart", component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      {path: "checkout", component: CheckoutComponent, canActivate: [StoreFirstGuard]},
      {path: "threedview", component: ThreeDimensionViewComponent},
      {path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule), canActivate: [StoreFirstGuard]},
      {path: "**", redirectTo: "/store"},
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
