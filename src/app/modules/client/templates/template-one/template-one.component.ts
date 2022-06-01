import { ResumeDto } from 'src/app/models/resume/resume-dto';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cv-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {
  
  @ViewChild('doc') doc!: ElementRef
  @Input() public resumeEditForm!: ResumeDto
  @Input() public showLogo: boolean = false
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;

  constructor() { }

  ngOnInit(): void {
  
  }

}
