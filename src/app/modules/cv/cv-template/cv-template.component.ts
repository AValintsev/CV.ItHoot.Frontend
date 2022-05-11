import { ResumeDto } from './../../../models/resume-dto';
import { Form, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss']
})
export class CvTemplateComponent implements OnInit {

  @Input() resumeEditForm!: ResumeDto 
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;
  constructor() { }

  ngOnInit(): void {
    console.log(this.resumeEditForm)
  }
  getFormControlValue(name:string) {
    if (this.resumeEditForm && this.resumeEditForm[name]){
      return this.resumeEditForm[name]
    }
    
  }
}
