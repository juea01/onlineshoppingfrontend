import { AfterViewInit, Component } from "@angular/core";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";

@Component({
  templateUrl: "orderTable.component.html"
})

export class OrderTableComponent implements AfterViewInit{
  includeShipped = false;

  constructor(private repository: OrderRepository){

  }

  getOrders():Order[] {
    return this.repository.getOrders().filter(o => this.includeShipped || !o.shipped);
  }

  ngAfterViewInit() {
    this.repository.getUpdatedJob().subscribe((order:Order) => {
      console.log(order);
      this.repository.addOrder(order);
      console.log("Event from Socket Io received");
    });
  }

  markShipped(order: Order){
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  delete(id: number){
    this.repository.deleteOrder(id);
  }

}
