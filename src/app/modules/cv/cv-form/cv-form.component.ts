import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/shared/models/education';
import { Experience } from 'src/app/shared/models/experience';
import { Language } from 'src/app/shared/models/language';
import { Skill } from 'src/app/shared/models/skill';
import { faGlobe, faMapMarkerAlt, faMobileAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import {CV} from "../../../shared/models/cv";

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss']
})
export class CvFormComponent implements OnInit {

  public Cv : CV = new CV;
  @Input() Id : number = 0


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
