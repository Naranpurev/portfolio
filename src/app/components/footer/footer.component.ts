import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title:string = "Say Hello"
  buttonStyle = {
    'font-size' : '14px',
    'margin-top' : '50px',
    'cursor' : 'pointer'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
