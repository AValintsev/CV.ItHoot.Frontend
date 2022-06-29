import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialCharacterDirective } from './special-character.directive';



@NgModule({
  declarations: [SpecialCharacterDirective],
  imports: [
    CommonModule
  ],
  exports: [SpecialCharacterDirective]
})
export class DirectivesModule { }
