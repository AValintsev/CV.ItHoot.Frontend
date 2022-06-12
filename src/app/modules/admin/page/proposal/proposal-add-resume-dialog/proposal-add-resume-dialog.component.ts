import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ResumeService} from "../../../../../services/resume.service";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {PositionDto} from "../../../../../models/position/position-dto";
import {PositionService} from "../../../../../services/position.service";


@Component({
  selector: 'proposal-add-resume-dialog',
  templateUrl: './proposal-add-resume-dialog.component.html',
  styleUrls: ['./proposal-add-resume-dialog.component.scss']
})
export class ProposalAddResumeDialogComponent implements OnInit {

  allResumes: SmallResumeDto[] = [];
  resume: SmallResumeDto | null = null;

  positions: PositionDto[] = [];
  position: PositionDto | null = null;

  constructor(public dialogRef: MatDialogRef<ProposalAddResumeDialogComponent>,
              private resumeService: ResumeService,
              private positionService:PositionService) {
    resumeService.getAllResume().subscribe(resumes => this.allResumes = resumes);
    positionService.getAllPositions().subscribe(positions=>this.positions = positions);
  }

  ngOnInit(): void {
  }

  canAdd(): boolean {
    return this.resume == null;
  }


  click(): void {
    this.dialogRef.close(this.resume);
  }

  getResumesByPosition() {
      if(this.position){
        this.resume = null;
        let positions = [] as PositionDto[];
        positions.push(this.position);
        this.resumeService.getAllResumesByPositions(positions).subscribe(resumes=>this.allResumes = resumes);
      }
  }
}
