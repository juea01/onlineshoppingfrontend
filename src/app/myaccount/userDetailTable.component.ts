import { AfterViewInit, Component } from "@angular/core";
import { User } from "../model/user.model";
import { UserRepository } from "../model/user.repository";
import { WindowSizeServiceService } from "../service/window-size-service.service";

@Component({
  templateUrl: "userDetailTable.component.html"
})

export class UserDetailTableComponent implements AfterViewInit{

  userDetail = new User();
  constructor(private repository: UserRepository, private windowSizeService: WindowSizeServiceService){

    this.repository.loadUserForUserDetail().subscribe(
      user => {
      console.log("Success");
      this.userDetail = user;
      }, error => {

        console.log(error);
      });
  }



  getUserDetails():User {
    return this.userDetail;
  }



  ngAfterViewInit() {

  }

  getWindowInnerWidth():number {
    return this.windowSizeService.getWindowInnerWidth();
  }

  getOptimalMainContainerHeight():string {
    return this.windowSizeService.getOptimalMainContainerHeight();
  }

}
