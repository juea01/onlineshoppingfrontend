import { AfterViewInit, Component } from "@angular/core";
import { User } from "../model/user.model";
import { UserRepository } from "../model/user.repository";

@Component({
  templateUrl: "userDetailTable.component.html"
})

export class UserDetailTableComponent implements AfterViewInit{

  constructor(private repository: UserRepository){

  }

  getUserDetails():User {
    return this.repository.getUser();
  }

  ngAfterViewInit() {

  }

}
