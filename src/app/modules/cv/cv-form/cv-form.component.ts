import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education';
import { Experience } from 'src/app/models/experience';
import { Language } from 'src/app/models/language';
import { Skill } from 'src/app/models/skill';
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { CV } from "../../../models/cv";

@Component({
  selector: 'cv-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {

  public Cv: CV = new CV;
  @Input() Id: number = 0


  public languages: Language[] = [];
  public experiences: Experience[] = [];
  public educations: Education[] = [];
  public skills: Skill[] = [];
  //public cvInfo: CvInfo = new CvInfo;
  public id: string = "";

  //public userCvInfo$!: Observable<CvInfo>;

  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;

  constructor() { }

  ngOnInit(): void {
  }

}
