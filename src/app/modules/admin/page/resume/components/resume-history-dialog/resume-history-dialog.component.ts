import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ResumeService} from "../../../../../../services/resume.service";
import {ResumeHistoryDto, ResumeHistoryStartStatus} from "../../../../../../models/resume/resume-history-dto";
import {SmallResumeDto} from "../../../../../../models/resume/small-resume-dto";
import {SnackBarService} from "../../../../../../services/snack-bar.service";

@Component({
  selector: 'cv-resume-history-dialog',
  templateUrl: './resume-history-dialog.component.html',
  styleUrls: ['./resume-history-dialog.component.scss']
})
export class ResumeHistoryDialog implements OnInit {

  resume: SmallResumeDto;
  resumeHistory:ResumeHistoryDto[];

  displayedColumns = ['updatedAt', 'updatedBy', 'status', 'newResumeJson', 'oldResumeJson'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private resumeService:ResumeService,
              private snackBarService:SnackBarService) {
    this.resume = data.resume;
    this.resumeService.getAllResumeHistory(this.resume.id).subscribe(histories=>{
      this.resumeHistory = histories;
    })
  }


  ngOnInit(): void {
  }

  copyJson(json: string) {
    navigator.clipboard.writeText( json);
    this.snackBarService.showSuccess('Link copied');
  }

  getResumeHistoryStatus(history:ResumeHistoryDto) {
    switch (history.status) {
      case ResumeHistoryStartStatus.Created:
        return 'Created';
        case ResumeHistoryStartStatus.Updated:
        return 'Updated';
        case ResumeHistoryStartStatus.Deleted:
        return 'Deleted';
      case ResumeHistoryStartStatus.Duplicated:
        return `Duplicated to resume ${history.duplicatedResumeId} id`;
      case ResumeHistoryStartStatus.Recovered:
        return 'Recovered';
        default:
          return 'None';
    }
  }
}
