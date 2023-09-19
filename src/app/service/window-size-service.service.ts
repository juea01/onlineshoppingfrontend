import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeServiceService {

  constructor() { }

  getWindowInnerWidth():number {
    return window.innerWidth;
  }

 private getWindowInnerHeight():number {
    return window.innerHeight;
  }

  private getMainContainerHeight():number {
    return document.querySelector('#main-container').clientHeight;
  }

  getOptimalMainContainerHeight():string {
    if (this.getMainContainerHeight() >= this.getWindowInnerHeight()) {
      let pixel = this.getMainContainerHeight();
     console.log(`height to set to main container as it is bigger than window height ${pixel}, ${this.getWindowInnerHeight()}`);
      return pixel+10+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
     console.log(`height to set to main container as it is smaller than window height ${pixel} , ${this.getWindowInnerHeight()}`);

      return this.getWindowInnerHeight()+200+"px";
    }
  }
}
