import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ModelModule} from "../model/model.module";
import {StoreComponent} from "./store.component";
import {AboutUsComponent} from "./aboutUs.component";
import {CounterDirective} from "./counter.directive";
import { RouterModule} from "@angular/router";

import { NavBarModule } from "../nav-bar/nav-bar.module";

import { FooterComponent } from '../footer/footer.component';
import { PredictionComponent } from '../prediction/prediction.component';
import { ProductDetailComponent } from './productDetail.component';

import { GalleryComponent } from "../imageGallery/gallery.component";
import { GalleryDirective } from "../imageGallery/gallery.directive";

import { DialogComponent } from "./dialog.component";
import { ServiceModule } from "../service/service.module";

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule, RouterModule, NavBarModule, ServiceModule],
  providers: [
    ],
  declarations: [StoreComponent, CounterDirective,
  FooterComponent,PredictionComponent, ProductDetailComponent, GalleryComponent, GalleryDirective, AboutUsComponent, DialogComponent ],
  exports: [StoreComponent, FooterComponent, ProductDetailComponent]
})
export class StoreModule {}
