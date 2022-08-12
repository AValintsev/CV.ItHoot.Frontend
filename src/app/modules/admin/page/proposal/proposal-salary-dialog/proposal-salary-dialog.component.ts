import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {ResumeService} from "../../../../../services/resume.service";

@Component({
  selector: 'cv-proposal-salary-dialog',
  templateUrl: './proposal-salary-dialog.component.html',
  styleUrls: ['./proposal-salary-dialog.component.scss']
})
export class ProposalSalaryDialog implements OnInit {

  resume!: SmallResumeDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProposalSalaryDialog>,
              public resumeService: ResumeService) {
    this.resume = data;
  }

  ngOnInit(): void {

  }


  submit() {

    this.dialogRef.close(this.resume);
  }

  canUpdate() {
    return this.resume.salaryRate == null || this.resume.salaryRate.toString() == '';
  }
}


