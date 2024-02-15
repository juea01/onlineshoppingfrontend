import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowSizeServiceService } from "../../../service/window-size-service.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  sessionId: string;
  constructor(private route: ActivatedRoute, private windowSizeService: WindowSizeServiceService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if(this.sessionId.match("{CHECKOUT_SESSION_ID}")) {
        // must be redirecting from manage billing, redirect to user account
        this.router.navigate(['/myaccount']);
      }
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
