import { Directive, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: "[imageGallery]"
})
export class GalleryDirective {


  constructor(private el: ElementRef) {

  }

  @HostListener('click')
  imageChange() {
    let prev:any = document.getElementById("preview");
    let src:any = this.el.nativeElement.src;
    prev.src = src;

    var imageSlide = document.getElementsByClassName("img-slide");
    for(let i=0; i<imageSlide.length; i++) {
      imageSlide[i].classList.remove("active");
    }
    this.el.nativeElement.parentElement.classList.add("active");

  }


}
