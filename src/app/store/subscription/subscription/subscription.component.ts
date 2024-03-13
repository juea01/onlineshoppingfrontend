import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { KeycloakService } from "keycloak-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  monthlypriceId: string = "price_1OjUWxBfSvAMzEWCPzPsZSCq";
  threemonthpriceId: string = "price_1OjUYLBfSvAMzEWCA49MoJYt";
  isMonthlyPlanSelected: boolean = false;
  isThreeMonthlyPlanSelected: boolean = false;

  constructor(private subscriptionService: SubscriptionService, private keycloak: KeycloakService, private router: Router) { }

  ngOnInit(): void {
    this.checkUserLoggedinStatus();
  }


  formClicked(event: MouseEvent, priceId: string) {
    if (priceId.match(this.monthlypriceId)) {
      this.isMonthlyPlanSelected = true;
      this.isThreeMonthlyPlanSelected = false;
    }

    if (priceId.match(this.threemonthpriceId)) {
      this.isMonthlyPlanSelected = false;
      this.isThreeMonthlyPlanSelected = true;
    }
    this.subscriptionService.setSelectedPriceId(priceId);
  }

  checkUserLoggedinStatus():void {
    this.keycloak.isLoggedIn().then(isLoggedIn => {
      this.router.navigate(["/myaccount/main/payment"]);
    })
  }
}
