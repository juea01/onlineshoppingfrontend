import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValueStoreService {

  private isItemPremium = false;

  private articlePagination: number = 0;
  private productPagination: number = 0;
  private casestudyPagination: number = 0;

  private isSetScrollToBookListView = false;
  private isSetScrollToCaseStudyListView = false;

  private previousPage: string = null;

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


  public setCasestudyPagination(paginationNum: number){
    this.casestudyPagination = paginationNum;
  }

  public getCasestudyPagination(){
    return this.casestudyPagination;
  }

  public setProductPagination(paginationNum: number){
    this.productPagination = paginationNum;
  }

  public getProductPagination(){
    return this.productPagination;
  }

  public setScrollToBookListView(isSetScrollToBookList: boolean){
    this.isSetScrollToBookListView = isSetScrollToBookList;
  }

  public isScrollToBookListView():boolean {
    return this.isSetScrollToBookListView;
  }

  public setScrollToCaseStudyListView(isSetScrollToCaseStudyListView: boolean){
    this.isSetScrollToCaseStudyListView = isSetScrollToCaseStudyListView;
  }

  public isScrollToCaseStudyListView():boolean {
    return this.isSetScrollToCaseStudyListView;
  }

  public getPreviousPage():string {
    return this.previousPage;
  }

  public setPreviousPage(previousPage:string):void {
    this.previousPage =  previousPage;
  }

}
