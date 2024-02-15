import { Component, OnInit } from '@angular/core';
import { SubscriptionRepository} from '../../model/Subscription.repository';
import { UserRepository } from '../../model/user.repository';
import { User } from "../../model/user.model";


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

  constructor(private subscriptionRepo: SubscriptionRepository, private userRepository: UserRepository) { }

  ngOnInit(): void {
    this.userRepository.loadUserForUserDetail().subscribe(
      user => {
      console.log("Success loading user");
      this.userDetail = user;
      }, error => {
       console.log(`Error loading user ${error}`);
      });

      this.userRepository.getKeycloakUserId().subscribe(userId=> {
        this.keycloakUserId = userId;
      })
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
