import {Component} from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: "store",
  templateUrl: "aboutUs.component.html",
  styleUrls: ["aboutUs.component.css"]
})
export class AboutUsComponent {
  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;
  public message: string;

  constructor(private dialog: MatDialog, private router: Router) {}



  getWindowInnerWidth():number {
    return window.innerWidth;
  }

  getWindowInnerHeight():number {
    return window.innerHeight;
  }

  getMainContainerHeight():number {
    return document.querySelector('#main-container').clientHeight;
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.message = result.message;
    });
  }

  navigateToProduct() {
    this.router.navigate(['store']);
  }


  getOptimalMainContainerHeight():string {
    if (this.getMainContainerHeight() >= this.getWindowInnerHeight()) {
      let pixel = this.getMainContainerHeight();
     console.log(`height to set to main container as it is bigger than window height ${pixel}, ${this.getWindowInnerHeight()}`);
      return pixel+"px";
    } else {
      //footer is 200px and nav is around 50px
      let pixel = (this.getWindowInnerHeight() - (200+this.getMainContainerHeight())) +this.getMainContainerHeight();
     console.log(`height to set to main container as it is smaller than window height ${pixel} , ${this.getWindowInnerHeight()}`);

      return this.getWindowInnerHeight()+200+"px";
    }
  }
}
