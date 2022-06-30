import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialCharacterDirective } from './special-character.directive';
import {NumericDirective} from "../../../helpers/numeric-directive";



@NgModule({
  declarations: [SpecialCharacterDirective,NumericDirective],
  imports: [
    CommonModule
  ],
  exports: [SpecialCharacterDirective,NumericDirective]
})
export class DirectivesModule { }
