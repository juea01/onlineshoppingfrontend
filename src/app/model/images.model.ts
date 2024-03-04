import { Injectable } from "@angular/core";
import { Image } from "./image.model";


@Injectable({
  providedIn: 'root'
})
export class Images {

  public images: Image[] = [];

  setImages(images:Array<Image>) {
    this.images = images;
  }

  getImages() {
    return this.images;
  }
}
