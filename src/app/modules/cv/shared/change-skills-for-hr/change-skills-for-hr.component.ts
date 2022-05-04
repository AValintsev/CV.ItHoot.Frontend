import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-change-skills-for-hr',
  templateUrl: './change-skills-for-hr.component.html',
  styleUrls: [
    './change-skills-for-hr.component.scss',
    '../../../../shared/styles/cvfull.scss',
    '../../../../shared/styles/cv-button.scss']
})
export class ChangeSkillsForHrComponent implements OnInit {
@Output() addSkills = new EventEmitter();
  constructor() { }
  name!: string;
  level!: number;

  ngOnInit(): void {
    this.level=1;
  }



  addSkill(){
    this.addSkills.emit(
      {
        name:this.name,
        level:this.level
      })
    this.name='';
    this.level=0;
  }
}
