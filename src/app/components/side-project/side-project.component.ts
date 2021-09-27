import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-project',
  templateUrl: './side-project.component.html',
  styleUrls: ['./side-project.component.css']
})
export class SideProjectComponent implements OnInit {
  title:string = "Show More"
  buttonStyle = {
    'font-size' : '14px',
    'margin-top' : '50px',
    'cursor' : 'pointer'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
