import {Injectable} from "@angular/core";
import {Product} from "./product.model";
import {Observable, from} from "rxjs";
import {Order} from "./order.model";

@Injectable()
export class StaticDataSource{
  private products: Product[] =[
    new Product(1,"Product 1","Category 1", "Product 1 (Category 1)","link"),
    new Product(2,"Product 2","Category 1", "Product 2 (Category 1)","link"),
    new Product(3,"Product 3","Category 1", "Product 3 (Category 1)","link"),
    new Product(4,"Product 4","Category 1", "Product 4 (Category 1)","link")
  ];
  getProducts(): Observable<Product[]> {
    return from([this.products]);
  }

  saveOrder(order: Order): Observable<Order>{
    console.log(JSON.stringify(order));
    return from([order]);
  }
}
