import { Injectable } from "@angular/core";
import {RestDataSource} from "./rest.datasource";
import { Observable} from "rxjs";
import { RedirectApiResponse } from '../model/redirectapiResponse.model';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionRepository {

  constructor(private dataSource: RestDataSource){

  }

  subscribe(priceId: string, username: string, keycloakUserId: string): Observable<RedirectApiResponse> {
   return this.dataSource.subscribe(priceId, username, keycloakUserId);
  }

  manageBilling(username: string): Observable<RedirectApiResponse> {
    return this.dataSource.manageBilling(username);
   }

}
