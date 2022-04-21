import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-change-educations-for-hr',
  templateUrl: './change-educations-for-hr.component.html',
  styleUrls: [
    './change-educations-for-hr.component.scss',
    '../../../shared/styles/cvfull.scss',
    '../../../shared/styles/cv-button.scss']
})
export class ChangeEducationsForHRComponent implements OnInit {
  institutionName!: string;
  specialization!: string;
  degree!: string;
  description!: string;
  startDate?: Date;
  endDate?: Date;

  @Output() addEducations = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addEducation(){
    this.addEducations.emit({
      institutionName: this.institutionName,
      specialization: this.specialization,
      degree: this.degree,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate
    })

    this.institutionName='';
    this.specialization='';
    this.degree='';
    this.description='';
    this.startDate=new Date();
    this.endDate= new Date();
  }
}
