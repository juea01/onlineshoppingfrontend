import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { User } from 'src/app/model/user.model';

@Injectable()
export class AuthGuard {

  user = new User();

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.user = JSON.parse(sessionStorage.getItem('userdetails'));
    if(!this.user){
      console.log("No user authentication, redirecting to authentication page");
        this.router.navigate(['auth']);
    }
    console.log("User has been authenticated, redirecting to my account > main page");
    return this.user?true:false;
  }

}

