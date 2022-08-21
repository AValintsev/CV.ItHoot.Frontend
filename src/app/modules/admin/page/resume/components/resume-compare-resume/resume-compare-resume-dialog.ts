import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'cv-resume-compare-resume',
  templateUrl: './resume-compare-resume-dialog.html',
  styleUrls: ['./resume-compare-resume-dialog.scss']
})
export class ResumeCompareResumeDialog implements OnInit {

  oldResume:any;
  newResume:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.oldResume = JSON.parse(data.oldResume);
    this.newResume = JSON.parse(data.newResume);
  }

  ngOnInit(): void {
  }

}
