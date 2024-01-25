import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowSizeServiceService } from "../../../service/window-size-service.service";


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  sessionId: string;
  constructor(private route: ActivatedRoute, private windowSizeService: WindowSizeServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
    })
    // const urlParams = new URLSearchParams(window.location.search);
    //  const sessionId = urlParams.get("session_id")

    //  if ( sessionId) {
    //   //make request here
    //  }
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }
}
