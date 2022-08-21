import {Component, OnInit} from '@angular/core';
import {ResumeHistoryDto, ResumeHistoryStartStatus} from "../../../../../../models/resume/resume-history-dto";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ResumeService} from "../../../../../../services/resume.service";
import {ResumeCompareResumeDialog} from "../../components/resume-compare-resume/resume-compare-resume-dialog";
import {Dialog} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'cv-resume-history-page',
  templateUrl: './resume-history-page.component.html',
  styleUrls: ['./resume-history-page.component.scss']
})
export class ResumeHistoryPage implements OnInit {

  resumeHistories: ResumeHistoryDto[];
  displayedColumns = ['action', 'updatedAt', 'updatedBy', 'status'];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private resumeService:ResumeService
  ) {
    this.route.params.subscribe(params => {
      const resumeId = params['resumeId'];
      this.resumeService.getAllResumeHistory(resumeId).subscribe(histories=>{
        this.resumeHistories = histories;
      })

    });
  }

  ngOnInit(): void {
  }

  openCompareDialog(history:ResumeHistoryDto){
    const dialogRef = this.dialog.open(ResumeCompareResumeDialog, {
      width:"100%",
      data:{
        oldResume: history.oldResumeJson, newResume: history.newResumeJson}
    });
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
