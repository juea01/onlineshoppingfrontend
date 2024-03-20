import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../model/search.model';
import { KeycloakService } from "keycloak-angular";
import { UserRepository } from '../model/user.repository';
import {User} from "../model/user.model";
import { environment as docker_env_config } from 'src/environments/environment.docker';
import * as _ from 'lodash';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {

  navbarOpen = false;
  public clicked = false;

  @ViewChild('searchValue', {static: true}) searchInput: ElementRef;
  _el: any;

  options = [
    {label: 'Search Article', value: 'searchArticle'},
    {label: 'Search Product', value: 'searchProduct'}
  ]
  selectedOption = this.options[0].value;

  toogleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private router: Router, private searchString: Search, private keycloak: KeycloakService, private userRepository: UserRepository) { }

  ngOnInit(): void {
  }

  onClick(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicked = true;
  }

  @HostListener('document:click',['event'])
  private clickedOutside(event): void {
    if(this.clicked) {
      this._el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show');
    }
  }

  search(searchValue?: string ) {
   // console.log(this.selectedOption);
    if (this.selectedOption == "searchProduct") {
      this.searchString.category = searchValue;
      this.searchInput.nativeElement.value = "";
      this.router.navigate(['store']);
    } else {
      this.searchString.category = searchValue;
      this.searchInput.nativeElement.value = "";
      this.router.navigate(['article']);
    }


  }

  navigateToHome() {
    this.searchString.category = "";
    this.router.navigate(['store']);
  }

  navigateToArticle(subCategory: string) {
    this.router.navigate(['article', subCategory]);
  }


  navigateToCaseStudy() {
    this.router.navigate(['casestudy']);
  }

  navigateToRegistration() {
    this.router.navigate(['registration']);
  }


   /**
  * To use logout functionality provided by library (keycloak 8.3.0) compatible with Angular 9
  * We need to add --spi-login-protocol-openid-connect-legacy-logout-redirect-uri=true start when starting docker container.
  * Please see here -> https://www.keycloak.org/2022/04/keycloak-1800-released
  * Newer version of keycloak doesn't support redirect uri option anymore
  * Please see more, OpenID Connect Logout section (https://www.keycloak.org/2022/04/keycloak-1800-released)
  * Need to upgrade Angular as well as keycloak library
  */
   logout() {

    this.keycloak.logout(`${docker_env_config.keycloakRedirectUrl}`).then(()=> {
      this.keycloak.clearToken();
      this.userRepository.clearUserData();
    })


  }

  getUserDetail(): User {
    return this.userRepository.getUser();
  }

  isUserEmailExist(): boolean {
    if (_.isEmpty(this.userRepository.getUser().email)) {
      return false;
    }
    return true;
  }

}
