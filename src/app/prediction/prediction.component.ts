import { Component, OnInit } from '@angular/core';
import { Prediction } from "../model/prediction.model";
import {PredictionRepository} from "../model/prediction.repository";

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent implements OnInit {
  public product = "Ring"
  constructor(private repository: PredictionRepository) {}

  ngOnInit(): void {
  }

  get prediction(): Prediction {
    return this.repository.getPrediction();
  }
}
