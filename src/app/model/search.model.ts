import { Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})
export class Search {
  public category: string;


  constructor(){

  }

  clear() {
    this.category = null;
  }

}
