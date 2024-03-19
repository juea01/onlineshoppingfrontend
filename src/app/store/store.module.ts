import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ModelModule} from "../model/model.module";
import {StoreComponent} from "./store.component";
import {AboutUsComponent} from "./aboutUs/aboutUs.component";
import {CounterDirective} from "./counter.directive";
import { RouterModule} from "@angular/router";

import { NavBarModule } from "../nav-bar/nav-bar.module";

import { FooterComponent } from '../nav-bar/footer/footer.component';
import { PredictionComponent } from '../prediction/prediction.component';
import { ProductDetailComponent } from './product/productDetail.component';

import { GalleryComponent } from "../imageGallery/gallery.component";
import { GalleryDirective } from "../imageGallery/gallery.directive";

import { DialogComponent } from "./dialog/dialog.component";
import { ServiceModule } from "../service/service.module";

import { EmailConfirmationComponent } from "./emai/emailConfirmation.component";
import { SubscriptionComponent } from './subscription/subscription/subscription.component';

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule, NavBarModule, ServiceModule],
  providers: [
    ],
  declarations: [StoreComponent, CounterDirective,
  PredictionComponent, ProductDetailComponent, GalleryComponent, GalleryDirective, AboutUsComponent, DialogComponent, EmailConfirmationComponent, SubscriptionComponent ],
  exports: [StoreComponent, ProductDetailComponent, EmailConfirmationComponent]
})
export class StoreModule {}
