import {ResumeService} from 'src/app/services/resume.service';
import {ResumeDto} from '../../../models/resume-dto';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {faAt, faGlobe, faMapMarkerAlt, faMobileAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cv-cv-template',
  templateUrl: './cv-template.component.html',
  styleUrls: ['./cv-template.component.scss']
})
export class CvTemplateComponent implements OnInit {
  @ViewChild('doc') doc!: ElementRef
  @Input() public resumeEditForm!: ResumeDto
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;

  constructor( ) {
  }
  ngOnInit(): void {
  }


  getFormControlValue(name: string) {
    if (this.resumeEditForm && this.resumeEditForm[name]) {
      return this.resumeEditForm[name]
    }

  }

}


