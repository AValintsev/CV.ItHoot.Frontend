import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'cv-burger-btn',
  templateUrl: './burger-btn.component.html',
  styleUrls: ['./burger-btn.component.scss']
})
export class BurgerBtnComponent implements OnInit {
 @Output()toggleSideBar = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

openSideBar(){
this.toggleSideBar.emit(event)
}

}
