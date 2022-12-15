import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Product} from "./product.model";
import {Cart} from "./cart.model";
import {Article} from "./article.model";
import {Order} from "./order.model";
import { Prediction } from "./prediction.model";
import {catchError, map } from "rxjs/operators"
import { HttpHeaders } from "@angular/common/http";
import {Socket} from "ngx-socket-io";
import { User } from 'src/app/model/user.model';

const PROTOCOL = "http";
const PORT = 8765;
const MLPORT = 5000;

@Injectable()
export class RestDataSource{
  baseUrl: string;
  auth_token: string;

  mlPredictionUrl: string;

  //constructor(private http: HttpClient, private socket: Socket) {
  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  //  this.mlPredictionUrl = `${PROTOCOL}://${location.hostname}:${MLPORT}/`;
    //this.baseUrl = "/api/";
  }

  //SocketIO
 // updatedJob = this.socket.fromEvent<Order>('updatedJob');

  getProducts():Observable<Product[]> {
    return this.sendRequest<Product[]>("GET",`${this.baseUrl}product-listing-service/products`);
  }

  saveOrder(order: Order): Observable<Order> {
    return this.sendRequest<Order>("POST",`${this.baseUrl}customer-order-fulfillment-service/orders/`,null, null, order);
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
    return this.sendRequest<Product>("POST",`${this.baseUrl}product-listing-service/products/`,null, product);
  }

  updateProduct(product): Observable<Product> {
    return this.sendRequest<Product>("PUT",`${this.baseUrl}product-listing-service/products/${product.id}`, null, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}product/${id}`, this.getOptions());
  }

  getOrders(): Observable<Order[]> {
    return this.sendRequest<Order[]>("GET",`${this.baseUrl}customer-order-fulfillment-service/orders/`);
  }

  getOrdersByLoggedInUserName(username: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}user-service/customers/${username}/orders`,{ withCredentials: true });
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.baseUrl}orders/${id}`, this.getOptions());
  }

  updateOrder(order: Order): Observable<Order> {
    return this.sendRequest<Order>("PUT",`${this.baseUrl}customer-order-fulfillment-service/orders/${order.id}`,null, null, order);
  }


  getUserByName(username: string): Observable<User> {
   // return this.http.get<User>(this.baseUrl + "user-service/customers/"+username, {withCredentials: true});
    return this.sendRequest<User>("GET",`${this.baseUrl}user-service/customers/${username}`);
  }

  saveUser(user: User): Observable<User> {
    //return this.http.post<User>(this.baseUrl + "user-service/customers/", user);
    return this.sendRequest<User>("POST",`${this.baseUrl}user-service/customers/`, user);
  }

  updateUser(user: User): Observable<User> {
  //  return this.http.put<User>(`${this.baseUrl}user-service/customers/${user.id}`, user, {withCredentials: true});

    return this.sendRequest<User>("PUT",`${this.baseUrl}user-service/customers/${user.id}`, user);
  }

  getArticles(): Observable<Article[]> {
    return this.sendRequest<Article[]>("GET",`${this.baseUrl}product-listing-service/articles/`);
  }

  getArticle(articleId: number): Observable<Article> {
    return this.sendRequest<Article>("GET",`${this.baseUrl}product-listing-service/articles/${articleId}`);
  }

  private sendRequest<T>(verb: string, url: string, userBody?: User, productBody?: Product, orderBody?: Order): Observable<T> {

    let body = userBody ? userBody : productBody ? productBody : orderBody? orderBody: null;
    return this.http.request<T>(verb, url, {body: body, withCredentials: true}, ).pipe(catchError(
      (error: Response) => throwError(`Network Error: ${error.statusText} (${error.status})`)
    ));
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
