import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-change-experiences-for-hr',
  templateUrl: './change-experiences-for-hr.component.html',
  styleUrls: ['./change-experiences-for-hr.component.scss',
    '../../../../shared/styles/cvfull.scss',
    '../../../../shared/styles/cv-button.scss'
  ]
})
export class ChangeExperiencesForHRComponent implements OnInit {
  company!: string;
  position!: string;
  description!: string;
  startDate?: Date;
  endDate?: Date;
  constructor() { }
  @Output() addExperiences = new EventEmitter();
  ngOnInit(): void {
  }

  addExperiance(){
    this.addExperiences.emit({
      company:this.company,
      position:this.position,
      description:this.description,
      startDate:this.startDate,
      endDate:this.endDate
    })
    this.company='';
    this.position='';
    this.description='';
    this.startDate=new Date();
    this.endDate=new Date()
  }
}
