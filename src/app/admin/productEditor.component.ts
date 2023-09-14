import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";


@Component({
  templateUrl: "productEditor.component.html",
  styleUrls: ["productEditor.component.css"]
})

export class ProductEditorComponent {

  editing: boolean = false;
  product: Product = new Product();
  maxAllowedImages: number = 3;

  selectedFiles: FileList = null;
  public errorMessage: string;

  constructor(private repository: ProductRepository, private router: Router, private activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      Object.assign(this.product, repository.getProduct(activeRoute.snapshot.params["id"]));
    }
  }

  save(form: NgForm) {
    if (form.valid) {
      this.repository.saveProduct(this.product).subscribe(pId =>{
        const formData = new FormData();
        if (this.product.images) {
          for (let i = 0; i < (this.maxAllowedImages -  this.product.images.length) && i < this.selectedFiles?.length; i++) {
            formData.append('file', this.selectedFiles[i], pId+"_"+this.selectedFiles[i].name);
         }
        } else {
          for (let i = 0; i < this.maxAllowedImages  && i < this.selectedFiles?.length; i++) {
            formData.append('file', this.selectedFiles[i], pId+"_"+this.selectedFiles[i].name);
         }
        }

        formData.append('productId', pId.toString());
        this.repository.saveImage(formData, this.product.id);
        this.router.navigateByUrl("/admin/main/products");
      }, error => {
        this.errorMessage = error;
      });
    } else {
      this.errorMessage = "Form Data Invalid";
    }

  }

  removeImage(event: Event, imageId: number) {
    event.preventDefault();
    this.repository.deleteImage(imageId, this.product.id).subscribe( p => {
      Object.assign(this.product, p);
    });
  }


  onFileSelected(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

}
