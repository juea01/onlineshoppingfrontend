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

  /**
   * Subscribe function frist check if user already has account through manageBilling() and if not continue with subscribe().
   * Some users could already have account but suspended due to payment failure in second month for example.
   * @param priceId Price id of stripe product
   */
  subscribe(priceId: string){
    this.subscriptionRepo
    .manageBilling(this.userDetail.username)
    .subscribe((result) => {
      if (result.redirectView) {
        if (result.url) {
          window.location.href = result.url;
        }
      } else {
        //TODO:this need to handle properly including working with backend for response message
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
    });

  }

}
