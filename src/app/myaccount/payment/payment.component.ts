import { Component, OnInit } from '@angular/core';
import { SubscriptionRepository} from '../../model/Subscription.repository';
import { UserRepository } from '../../model/user.repository';
import { User } from "../../model/user.model";
import { SubscriptionService } from '../../service/subscription.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

    monthlypriceId: string = "price_1OjUWxBfSvAMzEWCPzPsZSCq";
    threemonthpriceId: string = "price_1OjUYLBfSvAMzEWCA49MoJYt";
    userDetail = new User();
    keycloakUserId: string = '';

  constructor(private subscriptionRepo: SubscriptionRepository, private userRepository: UserRepository,
    private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {

    this.userRepository.loadUserForUserDetail().subscribe(
      user => {
      this.userDetail = user;

      /** TODO: Rewrite this nested subscribe code block with something like forkJoin from rxjs */
      this.userRepository.getKeycloakUserId().subscribe(userId=> {
        this.keycloakUserId = userId;

        //user has selected Subscription plan before login, so call subscribe() with selected plan/price id
        if(!_.isEmpty(this.subscriptionService.getSelectedPriceId())) {
          var priceId = this.subscriptionService.getSelectedPriceId();
          this.subscriptionService.resetSelectedPriceId();
          this.subscribe(priceId);
        }

      })

      }, error => {
       console.log(`Error loading user ${error}`);
      });


  }

  subscribe(priceId: string){
    this.subscriptionRepo.subscribe(priceId, this.userDetail.username, this.keycloakUserId).subscribe((result)=> {
      if(result.redirectView){
        console.log(result.url);
        if (result.url) {
          console.log(`Redirecting user to  ${result.url} `);
          window.location.href = result.url;
        }
      }
    });
  }

}
