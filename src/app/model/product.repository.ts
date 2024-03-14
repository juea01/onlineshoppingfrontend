import {Injectable} from "@angular/core";
import {Product} from "./product.model";
//import {StaticDataSource} from "./static.datasource";
import {RestDataSource} from "./rest.datasource";
import { Observable } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ProductRepository {
  private products: Product[] = [];
  private categories: string[] = [];

  constructor(private dataSource: RestDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      this.categories = data.map(p => p.category).filter((c, index, array) => array.indexOf(c) == index).sort();
    });
  }

  getProducts(category: string = null): Product[] {
    if (!category) {
      return this.products;
    } else {
      return this.products.filter(p => {

        const product_category = p.category.toLocaleLowerCase().split(/[ -]/);
        const search_category = category.toLocaleLowerCase().split(/[ -]/);
        const hasCommonWord = product_category.some(word => search_category.includes(word));
        return hasCommonWord;
         });
    }

  }

  getProduct(id: number): Observable<Product>{
    return new Observable(observer => {
      let product =  this.products.find(p => p.id == id);
      observer.next(product);
      observer.complete();
    });
  }

  getCategories(): string[]{
    return this.categories;
  }

  saveProduct(product: Product): Observable<number> {

      return  new Observable(observer =>{
        if (product.id == null || product.id == 0){
          this.dataSource.saveProduct(product).subscribe(p => {
            product.id = p.id;
            this.products.push(product);
            observer.next(p.id);
            observer.complete();
          }, error => {
            observer.error(error);
          });
        } else {
          this.dataSource.updateProduct(product).subscribe(p => {
            this.products.splice(this.products.findIndex(p => p.id == product.id),1,product);
            observer.next(p.id);
            observer.complete();
          }, error => {
            observer.error(error);
          } )
        }

      });

  }

  saveImage(formData: FormData, pId: number) {
    this.dataSource.saveImage(formData).subscribe(res => {
        let product = this.products.find(p => p.id == pId);

        if (product.images) {
          for (const img of res) {
            product.images.push(img);
          }
        } else {
          product.images = res;
        }

        this.products.splice(this.products.findIndex(p => p.id == product.id),1,product);
    })
  }

  deleteImage(id: number, pId: number): Observable<Product> {
    return new Observable(observer => {
      this.dataSource.deleteImage(id).subscribe(res => {
        let product = this.products.find(p => p.id == pId);
        let images = product.images;
        images.splice(images.findIndex(img => img.id == id),1);
        product.images = null;
        product.images = images;
        this.products.splice(this.products.findIndex(p => p.id == product.id),1,product);
        observer.next(product);
        observer.complete();
      })
    })

  }


  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(p => {
      this.products.splice(this.products.findIndex(p => p.id == id), 1);
    })
  }

  getProductSize(): number{
    return this.products.length;
  }


}
