import {Component, Inject, OnInit} from '@angular/core';
import {DialogType} from "../../../../../models/enums";
import {PositionDto} from "../../../../../models/position/position-dto";
import {PositionService} from "../../../../../services/position.service";
import {TeamBuildPositionDto} from "../../../../../models/teamBuild/teamBuildPosition-dto";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'cv-team-build-position-dialog',
  templateUrl: './team-build-position-dialog.component.html',
  styleUrls: ['./team-build-position-dialog.component.scss']
})
export class TeamBuildPositionDialogComponent implements OnInit {

  DialogType = DialogType;
  dialogType: DialogType = DialogType.Create;
  positions!: PositionDto[];
  position!: TeamBuildPositionDto;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              positionService: PositionService){
    this.position = data.data;
    this.dialogType = data.type;
    if (this.dialogType == DialogType.Create){
      this.position.countMembers = 1;
    }
    positionService.getAllPositions().subscribe(positions => this.positions = positions);
  }

  ngOnInit(): void {
  }

  canCreate():boolean {
    return this.position && this.position?.countMembers > 0 && this.position?.positionId > 0;
  }

  positionChange() {
    const name = this.positions.filter(x=>x.positionId == this.position.positionId)[0].positionName;
    this.position.positionName = name;
  }
}
