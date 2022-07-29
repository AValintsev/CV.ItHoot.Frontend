import {MatIconModule} from '@angular/material/icon';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BurgerBtnComponent} from './burger-btn.component';


@NgModule({
  declarations: [
    BurgerBtnComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[
    BurgerBtnComponent
  ]
})
export class BurgerBtnModule { }
