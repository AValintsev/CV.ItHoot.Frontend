import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ResumeService} from "../../../../../services/resume.service";
import {SmallResumeDto} from "../../../../../models/resume/small-resume-dto";
import {PositionDto} from "../../../../../models/position/position-dto";
import {PositionService} from "../../../../../services/position.service";
import {map, startWith} from "rxjs/operators";
import {TeamBuildPositionDto} from "../../../../../models/teamBuild/teamBuildPosition-dto";


@Component({
  selector: 'cv-team-page-resume-dialog',
  templateUrl: './team-page-resume-dialog.component.html',
  styleUrls: ['./team-page-resume-dialog.component.scss']
})
export class TeamPageResumeDialogComponent implements OnInit {

  allResumes: SmallResumeDto[] = [];
  resume: SmallResumeDto | null = null;

  positions: PositionDto[] = [];
  position: PositionDto | null = null;

  constructor(public dialogRef: MatDialogRef<TeamPageResumeDialogComponent>,
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
 //todo !!
  test() {
      if(this.position){
        let positions = [] as TeamBuildPositionDto[];
        positions.push({positionName:this.position.positionName} as TeamBuildPositionDto);
        this.resumeService.getAllResumesByPositions(positions).subscribe(resumes=>this.allResumes = resumes);
      }
  }
}
