import { Injectable} from "@angular/core";


@Injectable()
export class Search {
  public category: string;


  constructor(){

  }

  clear() {
    this.category = null;
  }

}
