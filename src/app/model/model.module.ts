import {NgModule} from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

//import { SubjectRepository } from "./subject.repository";
//import { SubscriptionRepository } from "./Subscription.repository";
//const config: SocketIoConfig = { url: `http://${location.hostname}:1923`, options: {} };


@NgModule({
  //imports: [HttpClientModule,SocketIoModule.forRoot(config)],
  imports: [HttpClientModule],
  /**Following providers... is commented out as we only want one instace of following classes throughout the application.
   * Each Service class is annotated with @Injectable({providedIn: 'root'}) to only have single instance.
   */
  // providers: [ProductRepository, Cart, PredictionRepository, UserRepository, ArticleRepository, SubjectRepository, SubscriptionRepository,
  // {provide: StaticDataSource, useClass: RestDataSource}, RestDataSource, AuthService, ConnectionService, Search, Images]
})
export class ModelModule{}
