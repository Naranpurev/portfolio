import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent 
implements OnInit {
  unitel:boolean = false;;
  santender:boolean = true;
  constructor() { }

  ngOnInit(): void {
    AOS.init()
  }
  showUnitel() {
    this.unitel = true
    this.santender = false;
  }
showSantender(){
    this.santender = true
    this.unitel = false;
  }
}
