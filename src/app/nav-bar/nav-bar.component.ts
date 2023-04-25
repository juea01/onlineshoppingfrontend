import { Component, OnInit, ViewEncapsulation, AfterViewInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../model/search.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnInit {

  navbarOpen = false;
  public clicked = false;




  _el: any;

  toogleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  constructor(private router: Router, private searchString: Search) { }

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
    this.searchString.category = searchValue;
    console.log(searchValue);

  }

  navigateToHome() {
    this.router.navigate(['store']);
  }

  navigateToArticle(subCategory: string) {
    window.sessionStorage.setItem('articleSubcategory',subCategory);
    this.router.navigate(['article', subCategory]);
  }

}
