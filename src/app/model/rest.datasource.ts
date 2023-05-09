import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Product} from "./product.model";
import {Cart} from "./cart.model";
import {Article} from "./article.model";
import { Prediction } from "./prediction.model";
import {catchError, map } from "rxjs/operators"
import { HttpHeaders } from "@angular/common/http";
import {Socket} from "ngx-socket-io";
import { User } from 'src/app/model/user.model';
import { Reply } from 'src/app/model/reply.model';
import { Comment } from 'src/app/model/comment.model';
import { Image } from 'src/app/model/image.model';
import { ArticleImage } from 'src/app/model/articleImage.model';

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

  saveImage(formData: FormData): Observable<Image[]> {
   return this.sendRequest<Image[]>("POST", `${this.baseUrl}product-listing-service/products/images`,null, null, null, null,  formData);
  }

  deleteImage(id: number): Observable<Object> {
    return this.sendRequest<Object>("DELETE", `${this.baseUrl}product-listing-service/products/images/${id}`);
   }

  updateProduct(product): Observable<Product> {
    return this.sendRequest<Product>("PUT",`${this.baseUrl}product-listing-service/products/${product.id}`, null, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}product/${id}`, this.getOptions());
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

  saveArticle(article: Article): Observable<Article> {
    //return this.http.post<User>(this.baseUrl + "user-service/customers/", user);
    return this.sendRequest<Article>("POST",`${this.baseUrl}product-listing-service/articles/`, null, null, null, null, null,  article);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.sendRequest<Article>("PUT",`${this.baseUrl}product-listing-service/articles/${article.id}`, null, null, null, null, null,  article);
  }

  saveArticleImage(formData: FormData): Observable<ArticleImage[]> {
    return this.sendRequest<ArticleImage[]>("POST", `${this.baseUrl}product-listing-service/articles/images`,null, null, null, null,  formData);
   }

   deleteArticleImage(id: number): Observable<Object> {
     return this.sendRequest<Object>("DELETE", `${this.baseUrl}product-listing-service/articles/images/${id}`);
    }

  getArticles(): Observable<Article[]> {
    return this.sendRequest<Article[]>("GET",`${this.baseUrl}product-listing-service/articles/`);
  }

  getArticleDetailById(articleId: number): Observable<Article> {
    console.log("rest datasource > getArticleDetailById"+articleId);
    return this.sendRequest<Article>("GET",`${this.baseUrl}product-listing-service/articles/${articleId}`);
  }


  getArticleBySubcategory(subcategory: string): Observable<Article[]> {
    return this.sendRequest<Article[]>("GET",`${this.baseUrl}product-listing-service/articles/subcategory/${subcategory}`);
  }

  getRepliesByArticleAndCommentId(articleId: number, commentId: number): Observable<Reply[]> {
    return this.sendRequest<Reply[]>("GET", `${this.baseUrl}product-listing-service/articles/${articleId}/comments/${commentId}/replies`);
  }


  saveComment(comment: Comment): Observable<Comment> {
    //return this.http.post<User>(this.baseUrl + "user-service/customers/", user);
    return this.sendRequest<Comment>("POST",`${this.baseUrl}product-listing-service/comments`, null, null, comment, null);
  }

  updateComment(comment: Comment): Observable<Comment> {
    //  return this.http.put<User>(`${this.baseUrl}user-service/customers/${user.id}`, user, {withCredentials: true});

      return this.sendRequest<Comment>("PUT",`${this.baseUrl}product-listing-service/comments/${comment.id}`, null, null, comment, null);
    }

  saveReply(reply: Reply): Observable<Reply> {
    return this.sendRequest<Reply>("POST",`${this.baseUrl}product-listing-service/articles/comments/replies`,null, null, null, reply, null);
  }

  updateReply(reply: Reply): Observable<Reply> {
    return this.sendRequest<Reply>("PUT",`${this.baseUrl}product-listing-service/articles/comments/replies/${reply.id}`,null, null, null, reply, null);
  }

  private sendRequest<T>(verb: string, url: string, userBody?: User, productBody?: Product, commentBody?: Comment, replyBody?: Reply, formBody?: FormData, articleBody?: Article): Observable<T> {

    let body = userBody ? userBody : productBody ? productBody : commentBody ? commentBody : replyBody ? replyBody: formBody ? formBody: articleBody ? articleBody: null;
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
