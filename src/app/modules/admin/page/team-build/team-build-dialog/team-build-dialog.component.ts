import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TeamBuildDto} from "../../../../../models/teamBuild/teamBuild-dto";
import {DialogType} from "../../../../../models/enums";
import {ComplexityService} from "../../../../../services/complexity.service";
import {TeamBuildComplexityDto} from "../../../../../models/teamBuild/teamBuildComplexity-dto";
import {PositionService} from "../../../../../services/position.service";
import {PositionDto} from "../../../../../models/position/position-dto";
import {TeamBuildPositionDto} from "../../../../../models/teamBuild/teamBuildPosition-dto";
import {TeamBuildPositionDialogComponent} from "../team-build-position-dialog/team-build-position-dialog.component";
import {ThisReceiver} from "@angular/compiler";

@Component({
  selector: 'cv-team-build-dialog',
  templateUrl: './team-build-dialog.component.html',
  styleUrls: ['./team-build-dialog.component.scss']
})
export class TeamBuildDialogComponent implements OnInit {

  DialogType = DialogType;
  dialogType: DialogType = DialogType.Create;

  teamBuild: TeamBuildDto = {} as TeamBuildDto;
  complexities: TeamBuildComplexityDto[] = [];
  positions: PositionDto[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TeamBuildDialogComponent>,
              private complexityService: ComplexityService,
              private positionService: PositionService,
              private dialog:MatDialog) {
    this.teamBuild = data.data;
    this.teamBuild.complexityId = this.teamBuild.complexity.id;
    this.dialogType = data.type;
    complexityService.getAllComplexities().subscribe(complexities => {
      this.complexities = complexities
    });
    positionService.getAllPositions().subscribe(positions => this.positions = positions)
  }

  ngOnInit(): void {
  }


  removePosition(position: TeamBuildPositionDto) {
    const index = this.teamBuild.positions.indexOf(position);

    if (index >= 0) {
      this.teamBuild.positions.splice(index, 1);
    }
  }

  openPositionDialog(position: TeamBuildPositionDto | null = null) {
    let dialogType = DialogType.Edit;
    if (position == null){
      dialogType = DialogType.Create
      position = {} as TeamBuildPositionDto;
    }

    const dialogRef = this.dialog.open(TeamBuildPositionDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: {type: dialogType, data: position},
    });

    dialogRef.afterClosed().subscribe((position: TeamBuildPositionDto) => {
      if (position == null)
        return;

      if (this.teamBuild.positions.find(x=>x.positionName == position.positionName))
        return;

      if(dialogType == DialogType.Create){
        this.teamBuild.positions.push(position);
      }

    });
  }

  canCreate():boolean {
    return this.teamBuild && this.teamBuild.projectTypeName != '' && this.teamBuild.complexity && this.teamBuild.complexityId > 0;
  }

  complexityChange() {
    this.teamBuild.complexityId = this.teamBuild.complexity.id;
  }
}
