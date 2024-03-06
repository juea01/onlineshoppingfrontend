import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueStoreService {

  private isItemPremium = false;

  private articlePagination: number = 0;
  private productPagination: number = 0;

  constructor() { }

  public setItemPremium(isPremium: boolean):void {
    this.isItemPremium = isPremium;
  }

  public getItemPremium():boolean {
    return this.isItemPremium;
  }

  public setArticlePagination(paginationNum: number){
    this.articlePagination = paginationNum;
  }

  public getArticlePagination(){
    return this.articlePagination;
  }

  public setProductPagination(paginationNum: number){
    this.productPagination = paginationNum;
  }

  public getProductPagination(){
    return this.productPagination;
  }

}
