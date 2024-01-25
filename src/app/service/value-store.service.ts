import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueStoreService {

  private isItemPremium = false;
  constructor() { }

  public setItemPremium(isPremium: boolean):void {
    this.isItemPremium = isPremium;
  }

  public getItemPremium():boolean {
    return this.isItemPremium;
  }
}
