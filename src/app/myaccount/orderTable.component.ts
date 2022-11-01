import { AfterViewInit, Component } from "@angular/core";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";

@Component({
  templateUrl: "orderTable.component.html"
})

export class OrderTableComponent implements AfterViewInit{

  constructor(private repository: OrderRepository){

  }


  getOrdersByUserName():Order[] {
    return this.repository.getOrdersByLoggedInUserName();
  }

  ngAfterViewInit() {
  }

}
