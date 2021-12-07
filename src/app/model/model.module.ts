import {NgModule} from "@angular/core";
import {ProductRepository} from "./product.repository";
import {StaticDataSource} from "./static.datasource";
import {Cart} from "./cart.model";
import {Order} from "./order.model";
import {OrderRepository} from "./order.repository";
import { RestDataSource } from "./rest.datasource";
import { HttpClientModule } from "@angular/common/http";
import { AuthService} from "./auth.service";
import { ConnectionService } from "./connection.service";
import { Search } from "./search.model";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Prediction } from "./prediction.model";
import { PredictionRepository } from "./prediction.repository";
const config: SocketIoConfig = { url: `http://${location.hostname}:1923`, options: {} };


@NgModule({
  imports: [HttpClientModule,SocketIoModule.forRoot(config)],
  providers: [ProductRepository, Cart, Order, OrderRepository, PredictionRepository,
  {provide: StaticDataSource, useClass: RestDataSource}, RestDataSource, AuthService, ConnectionService, Search]
})
export class ModelModule{}
