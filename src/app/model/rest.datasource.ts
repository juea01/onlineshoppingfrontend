import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product.model";
import {Cart} from "./cart.model";
import {Order} from "./order.model";
import { Prediction } from "./prediction.model";
import {map } from "rxjs/operators"
import { HttpHeaders } from "@angular/common/http";
import {Socket} from "ngx-socket-io";
import { User } from 'src/app/model/user.model';

const PROTOCOL = "http";
const PORT = 8080;
const MLPORT = 5000;

@Injectable()
export class RestDataSource{
  baseUrl: string;
  auth_token: string;

  mlPredictionUrl: string;

  constructor(private http: HttpClient, private socket: Socket) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  //  this.mlPredictionUrl = `${PROTOCOL}://${location.hostname}:${MLPORT}/`;
    //this.baseUrl = "/api/";
  }

  //SocketIO
 // updatedJob = this.socket.fromEvent<Order>('updatedJob');

  getProducts():Observable<Product[]> {
    console.log(this.baseUrl+"baseURL");
    return this.http.get<Product[]>(this.baseUrl + "product");
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + "orders",order);
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + "login", {
      name: user, password: pass
    }).pipe(map(response => {
        this.auth_token = response.success ? response.token : null;
        return response.success;
    }));
  }

  //this is for communicating with spring backend (currently authenticate() above is for node backend)
  authenticateUser(user: User){

    window.sessionStorage.setItem("userdetails",JSON.stringify(user));
    return this.http.get(this.baseUrl + "user",{ observe: 'response',withCredentials: true });
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + "product", product, this.getOptions());
  }

  updateProduct(product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}product/${product.id}`, product, this.getOptions());
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}product/${id}`, this.getOptions());
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl +  "orders", this.getOptions());
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}orders/${id}`, this.getOptions());
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`, order, this.getOptions());
  }

  private getOptions() {
    return {
      headers: new HttpHeaders ({
        "Authorization": `Bearer<${this.auth_token}>`
      })
    }
  }

  getPrediction():Observable<Prediction> {
    console.log(this.mlPredictionUrl+"baseURL");
    return this.http.get<Prediction>(this.mlPredictionUrl + "weatherpredict");
  }


}
