import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  title:string = "Check out my portfolio!"
  buttonStyle = {
    'font-size' : '14px',
    'margin' : '50px 0 0',
    'padding' : '20px 28px',
    'cursor' : 'pointer'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
