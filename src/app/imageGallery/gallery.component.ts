import { Component, OnInit } from '@angular/core';
import { Images } from '../model/images.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {


  constructor(private images:Images) {

  }

  ngOnInit(): void {
  }

  getImages() {
    return this.images.getImages();
  }

  getFirstImage() {
    return this.images.getImages()[0];
  }


}
