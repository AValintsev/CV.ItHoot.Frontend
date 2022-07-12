import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ResumeDto} from "../../../../../models/resume/resume-dto";

@Component({
  selector: 'cv-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent implements OnInit {

  html:string;
  resume:ResumeDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.html = data.html;
    this.resume = data.resume;
  }

  ngOnInit(): void {
  }

}
