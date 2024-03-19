import {Component, OnInit, ElementRef} from "@angular/core";
import { Product } from "../../model/product.model";
import {ProductRepository} from "../../model/product.repository";
import { Cart } from "../../model/cart.model";
import { Router, ActivatedRoute } from "@angular/router";
import { Search } from '../../model/search.model';
import { Images } from '../../model/images.model';
import { TermsDialogComponent } from "../../service/terms-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { ValueStoreService } from "../../service/value-store.service";


@Component({
  selector: "productDetail",
  templateUrl: "productDetail.component.html",
  styleUrls: ["productDetail.component.css"],
  providers: [DatePipe]
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();


  constructor(private repository: ProductRepository, private cart: Cart, private router: Router, private activatedRoute: ActivatedRoute,
    private searchString: Search, private images:Images, private dialog: MatDialog,
    private datePipe: DatePipe, private elementRef: ElementRef, private valueStoreService: ValueStoreService) {

  }

  ngOnInit(): void {
     this.repository.getProduct(this.activatedRoute.snapshot.params["id"]).subscribe(product => {
      this.product = product;
      this.images.setImages(this.product.images);

      const scrollhere = this.elementRef.nativeElement.querySelector('#scrollhere');
       //Scroll to top of the page when the component initializes
       //this.elementRef.nativeElement.ownerDocument.defaultView.scrollTo({ top: 0, behavior: 'smooth' });
       window.scrollTo(0,0);//This native method is used as above method is not working though working in Article Detail
    });
  }

  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl("/cart");
  }


  getWindowInnerWidth():number {
    return window.innerWidth;
  }

  openTermsDialog(event: Event): void {
    event.preventDefault();

    const dialogConfig = {
      data: {
        isAcceptDecline: false
      }
    };

    const dialogRef=this.dialog.open(TermsDialogComponent, dialogConfig);

    //In this particular scenario, we are not really interested in following event. This code is for reference purpose only.
    dialogRef.afterClosed().subscribe((result)=> {
      if(result) {
        // console.log("Accept");
      } else {
        // console.log("Decline");
      }
    })
  }

  getTrimmedPublishDate(): string {
    return this.datePipe.transform(this.product.publishDate, 'yyyy-MM-dd');
  }

  getTrimmedLastEditedDate(): string {
    return this.datePipe.transform(this.product.lastEditDate, 'yyyy-MM-dd');
  }

  goBackToStorePage(): void {
    this.router.navigate(['store']);
  }





}
