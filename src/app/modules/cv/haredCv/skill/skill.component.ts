import {Component, Input, OnInit} from '@angular/core';
import {Skill} from "../../../../models/skill";

@Component({
  selector: 'app-skill',
  template: `
     <div class="left-item-title">
          <span>SKILLS</span>
        </div>
        <div *ngFor="let item of skills" class="skills">
          <div  class="skill">
            <div class="skill-icon"></div>
            <div class="skill-name">Skill:{{item.name}}</div>
            <div class="skill-level">Level: {{item.level}}</div>
          </div>
        </div>
  `,
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Input() skills:Skill[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
