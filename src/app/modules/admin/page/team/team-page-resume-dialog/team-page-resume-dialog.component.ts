import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ResumeService} from "../../../../../services/resume.service";
import {SmallResumeDto} from "../../../../../models/small-resume-dto";


@Component({
  selector: 'cv-team-page-resume-dialog',
  templateUrl: './team-page-resume-dialog.component.html',
  styleUrls: ['./team-page-resume-dialog.component.scss']
})
export class TeamPageResumeDialogComponent implements OnInit {

  allResumes: SmallResumeDto[] = [];
  resumeDto: SmallResumeDto = {} as SmallResumeDto;

  constructor(public dialogRef: MatDialogRef<TeamPageResumeDialogComponent>,
              resumeService: ResumeService) {
    resumeService.getAllResume().subscribe(resumes => this.allResumes = resumes);

  }

  ngOnInit(): void {
  }

  canCreate(): boolean {
    return false;
  }


  click():void {
    this.dialogRef.close(this.resumeDto);
  }
}
