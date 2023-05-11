import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../model/search.model';
import { FormsModule } from "@angular/forms";

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
    console.log(this.selectedOption);
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
    console.log("Nav to article"+subCategory);
    this.router.navigate(['article', subCategory]);
  }

}
