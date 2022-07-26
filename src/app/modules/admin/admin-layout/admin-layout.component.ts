import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'cv-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit{
  toggle = true
  constructor(  ) {
  }

  ngOnInit(): void {

  }
  sideBarToggler(){
    this.toggle = !this.toggle
  }

}
