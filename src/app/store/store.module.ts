import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ModelModule} from "../model/model.module";
import {StoreComponent} from "./store.component";
import {CounterDirective} from "./counter.directive";
import {CartSummaryComponent} from "./cartSummary.component";
import {CartDetailComponent} from "./cartDetail.component";
import {CheckoutComponent} from "./checkout.component";
import { RouterModule} from "@angular/router";
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { PredictionComponent } from '../prediction/prediction.component';
import { ProductDetailComponent } from './productDetail.component';

import { GalleryComponent } from "../imageGallery/gallery.component";
import { GalleryDirective } from "../imageGallery/gallery.directive";

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
  declarations: [StoreComponent, CounterDirective, CartSummaryComponent,
  CartDetailComponent, CheckoutComponent, NavBarComponent,FooterComponent,PredictionComponent, ProductDetailComponent, GalleryComponent, GalleryDirective ],
  exports: [StoreComponent, CartDetailComponent, CheckoutComponent, NavBarComponent, FooterComponent, ProductDetailComponent]
})
export class StoreModule {}
