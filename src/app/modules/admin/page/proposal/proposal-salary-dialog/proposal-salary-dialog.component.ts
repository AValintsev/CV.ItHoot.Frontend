import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {ResumeService} from "../../../../../services/resume.service";

@Component({
  selector: 'cv-proposal-salary-dialog',
  templateUrl: './proposal-salary-dialog.component.html',
  styleUrls: ['./proposal-salary-dialog.component.scss']
})
export class ProposalSalaryDialogComponent implements OnInit {

  resume!: SmallResumeDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ProposalSalaryDialogComponent>,
              public resumeService: ResumeService) {
    this.resume = data;
    console.log(this.resume)
  }

  ngOnInit(): void {

  }


  submit() {
    this.resumeService.changeSalaryRate(this.resume.id,this.resume.salaryRate).subscribe(() => {
      this.dialogRef.close();
    });
  }

  canUpdate() {
    return this.resume.salaryRate == null;
  }
}


