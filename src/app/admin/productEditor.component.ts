import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
  templateUrl: "productEditor.component.html"
})

export class ProductEditorComponent {
  editing: boolean = false;
  product: Product = new Product();
  constructor(private repository: ProductRepository, private router: Router, private activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      Object.assign(this.product, repository.getProduct(activeRoute.snapshot.params["id"]));
      console.log("Name"+this.product.name);
      console.log("Cat"+this.product.category);
      console.log("id"+this.product.id);
      console.log("Price"+this.product.price);
    }
  }

  save(form: NgForm) {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl("/admin/main/products");
  }

}
