import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss']
})
export class CvTemplateComponent implements OnInit {
  @Input() resumeEditForm!:FormGroup;
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.resumeEditForm.controls)
  }
  getFormControlValue(name:string){
    return this.resumeEditForm?.controls[name].value
  }
}
