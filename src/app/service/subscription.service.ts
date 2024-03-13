import { Injectable } from '@angular/core';

/**
   * This class is used to store user selection of Subscription type so that once user has logged in
   * relevant data can be retrieved.
   * ToDO: This class can be replace with something like Angular Ngrx store.
   * Because value store here (selectedPrice) is needed after user successfully login through keycloak server and Service
   * class in this case won't work as during login process, eventhough all steps happen within same tab, something like
   * page refresh happen and therefore Angular has to recreate everything including Service classes.
   */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }

  setSelectedPriceId(priceId: string) {
    window.sessionStorage.setItem("selectedPrice",priceId);
  }

  getSelectedPriceId():string {
    return  window.sessionStorage.getItem("selectedPrice");
  }

  resetSelectedPriceId(): void {
    window.sessionStorage.removeItem("selectedPrice");
  }

}
