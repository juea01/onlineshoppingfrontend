import {NgModule} from "@angular/core";
import {ProductRepository} from "./product.repository";
import {StaticDataSource} from "./static.datasource";
import {Cart} from "./cart.model";
import { UserRepository } from "./user.repository";
import { ArticleRepository } from "./article.repository";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
import { AuthService} from "./auth.service";
import { ConnectionService } from "./connection.service";
import { Search } from "./search.model";
import { Images } from "./images.model";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Prediction } from "./prediction.model";
import { PredictionRepository } from "./prediction.repository";
//const config: SocketIoConfig = { url: `http://${location.hostname}:1923`, options: {} };


@NgModule({
  //imports: [HttpClientModule,SocketIoModule.forRoot(config)],
  imports: [HttpClientModule],
  providers: [ProductRepository, Cart, PredictionRepository, UserRepository, ArticleRepository,
  {provide: StaticDataSource, useClass: RestDataSource}, RestDataSource, AuthService, ConnectionService, Search, Images]
})
export class ModelModule{}
