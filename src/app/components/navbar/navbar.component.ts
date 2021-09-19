import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  prevScroll = window.pageYOffset;
  hide:boolean = true;
  shadow:boolean = false;
  toggleMenu:boolean = true
  title:string="Resume";
  constructor() { }

  ngOnInit(): void {
    // this.onWindowScroll()

  }
  @HostListener("window:scroll")
  onWindowScroll() {
    let curScroll = window.pageYOffset;
    if(this.prevScroll > curScroll) {
      this.hide = true;
    } else {
      this.hide = false
      this.shadow = true
    }
    this.prevScroll = curScroll
    console.log(this.prevScroll, curScroll)
  }
}
