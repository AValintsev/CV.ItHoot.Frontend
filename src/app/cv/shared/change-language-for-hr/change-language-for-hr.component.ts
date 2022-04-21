import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Language} from "../../../shared/models/language";

@Component({
  selector: 'app-change-language-for-hr',
  templateUrl: './change-language-for-hr.component.html',
  styleUrls: ['./change-language-for-hr.component.scss','../../../shared/styles/cvfull.scss','../../../shared/styles/cv-button.scss']
})
export class ChangeLanguageForHrComponent implements OnInit {

  constructor() { }
  name!:string
  level:number =1
  @Output() onChangedLanguege = new EventEmitter()
  ngOnInit(): void {

  }
  onChange(){
    // console.log(this.language, this.level)
    this.onChangedLanguege.emit({name:this.name,level:this.level})
    this.level = 1;
    this.name='';

  }
}
