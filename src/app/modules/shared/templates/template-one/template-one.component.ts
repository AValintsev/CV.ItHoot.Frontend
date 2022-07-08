import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'cv-template-one',
  templateUrl: './template-one.component.html',
  styleUrls: ['./template-one.component.scss']
})
export class TemplateOneComponent implements OnInit {

  @ViewChild('doc') doc!: ElementRef
  @Input() public resume!: ResumeDto

  constructor() { }

  ngOnInit(): void {

  }

}
