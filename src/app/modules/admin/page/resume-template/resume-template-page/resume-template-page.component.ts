import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResumeDto} from "../../../../../models/resume/resume-dto";
import {PositionDto} from "../../../../../models/position/position-dto";

@Component({
  selector: 'cv-resume-template-page',
  templateUrl: './resume-template-page.component.html',
  styleUrls: ['./resume-template-page.component.scss'],
})
export class ResumeTemplatePageComponent implements OnInit {
  resume: ResumeDto;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.resume = {
      resumeName: 'This Test Name',
      firstName: 'Name',
      lastName: 'LastName',
      position: {positionName: 'Test Position'} as PositionDto,
      email: 'email@gmail.com',
      site: 'test-site.com',
      phone: '+38096000001',
      code: '29000',
      city: 'City',
      country: 'country',
      street: 'street',
      requiredPosition: 'required Position',
      birthdate: '11/11/2011',
      aboutMe: 'about me',
      experiences: [{
        company: 'Company Name',
        position: 'Position Name',
        description: 'description',
        startDate: '11/11/2011',
        endDate: '12/12/2012'
      }],
      educations: [{
        institutionName: 'Institution Name',
        specialization: 'Specialization Name',
        degree: 'Bachelors',
        description: 'description',
        startDate: '11/11/2011',
        endDate: '12/12/2012'
      }],
      skills: [{skillName: 'Skill name', level: 5}, {skillName: 'Skill name', level: 4}, {
        skillName: 'Skill name',
        level: 3
      }],
      languages: [{languageName: 'Language name', level: 5}, {
        languageName: 'Language name',
        level: 4
      }, {languageName: 'Language name', level: 3}]
    } as ResumeDto;

    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resume.resumeTemplateId = id;
    });
  }

  ngOnInit(): void {
  }


}
