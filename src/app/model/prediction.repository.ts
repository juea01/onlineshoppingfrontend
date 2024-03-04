import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Prediction} from "./prediction.model";
 import {RestDataSource} from "./rest.datasource";

 @Injectable({
  providedIn: 'root'
})
export class PredictionRepository {

  private prediction: Prediction;
  constructor(private dataSource: RestDataSource) {}


  getPrediction(): Prediction {
   this.dataSource.getPrediction().subscribe(prediction => this.prediction = prediction);
   return this.prediction;
  }




}
