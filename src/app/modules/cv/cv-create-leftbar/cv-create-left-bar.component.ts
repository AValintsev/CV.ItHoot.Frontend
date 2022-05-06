import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-cv-create-leftbar',
  templateUrl: './cv-create-left-bar.component.html',
  styleUrls: ['./cv-create-left-bar.component.scss'],
})
export class CvCreateLeftBarComponent implements OnInit {

  @Input()
  public resumeCreateForm: FormGroup = {} as FormGroup;
  constructor() { }

  ngOnInit(): void {}


}
