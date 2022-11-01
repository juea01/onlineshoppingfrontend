import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Order} from "./order.model";
import {User} from "./user.model";
//import {StaticDataSource} from "./static.datasource";
 import {RestDataSource} from "./rest.datasource";
import { UserRepository } from "./user.repository";
@Injectable()
export class OrderRepository {
  private orders: Order[] = [];
  private loaded: boolean = false;
  private hasError: boolean = false;
  user = new User();

  constructor(private dataSource: RestDataSource, private userRepository: UserRepository) {}

  loadOrders() {
    this.user = JSON.parse(sessionStorage.getItem('userdetails'));
    if(this.user){
      this.dataSource.getOrders().subscribe(
        orders => {
          this.loaded = true;
        this.orders = orders;
        }, error => {
          this.hasError = true;
          console.log(error);
        });
    }
  }

  // getUpdatedJob() {
  //   return this.dataSource.updatedJob;
  // }

  /**
   *
   * @returns Checking for this.loaded is good idea as whenever subscribe methods is called (for example from upper components)
   * http request is send to servers and if not careful it will drain both UI and server.
   * If we include expresion (method) in Template, angular repeatedly evaluate that expresion and resulting the method call repeatedly
   */
  getOrders(): Order[] {
    if (!this.loaded && !this.hasError) {
      this.loadOrders();
    }
    return this.orders;
  }


  getOrdersByLoggedInUserName(): Order[] {
    if (!this.loaded && !this.hasError && this.userRepository.getUser().id) {
    this.dataSource.getOrdersByLoggedInUserName(this.userRepository.getUser().username).subscribe(
      orders => {
        this.loaded = true;
        this.orders =  orders;
        console.log("Orders" + this.orders);
      }, error => {
        this.hasError = true;
        console.log(error);
      }
    );
    }
    return this.orders;
  }

  saveOrder(order: Order): Observable<Order> {
    return this.dataSource.saveOrder(order);
  }

  updateOrder(order: Order) {
      this.dataSource.updateOrder(order).subscribe(success => {
        this.orders.splice(this.orders.findIndex(o => o.id == order.id),1,order);
      });
  }

  addOrder(order:Order) {
    this.orders.push(order);
  }



  deleteOrder(id: number) {
    console.log(this.orders);
    this.dataSource.deleteOrder(id).subscribe(order => {
      this.orders.splice(this.orders.findIndex(o => o.id == id), 1);
      console.log(this.orders);
    })
  }



}
