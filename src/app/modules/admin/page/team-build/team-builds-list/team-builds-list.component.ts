import {Component, OnInit} from '@angular/core';
import {TeamBuildDto} from "../../../../../models/teamBuild/teamBuild-dto";
import {TeamBuildService} from "../../../../../services/teamBuild.service";
import {TeamBuildPositionDto} from "../../../../../models/teamBuild/teamBuildPosition-dto";
import {DialogType} from "../../../../../models/enums";
import {MatDialog} from "@angular/material/dialog";
import {TeamBuildDialogComponent} from "../team-build-dialog/team-build-dialog.component";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {TeamBuildComplexityDto} from "../../../../../models/teamBuild/teamBuildComplexity-dto";

@Component({
  selector: 'cv-team-builds-list',
  templateUrl: './team-builds-list.component.html',
  styleUrls: ['./team-builds-list.component.scss']
})
export class TeamBuildsListComponent implements OnInit {

  displayedColumns: string[] = ['projectType', 'complexity', 'positions', 'teamSize', 'estimation', 'status', 'action'];

  teamBuilds: TeamBuildDto[] = [];

  constructor(private teamBuildService: TeamBuildService,
              public dialog: MatDialog,
              private snackBarService:SnackBarService) {
    teamBuildService.getAllTeamBuilds().subscribe(teamBuilds => {
      this.teamBuilds = teamBuilds
    });
  }

  ngOnInit(): void {
  }

  getTeamSize(positions: TeamBuildPositionDto[]): number {
    let size = 0;
    positions.forEach(position => {
      size += position.countMembers
    });
    return size;
  }

  openTeamBuildDialog(teamBuild: TeamBuildDto | null = null) {
    let dialogType = DialogType.Edit;
    if (teamBuild == null) {
      dialogType = DialogType.Create
      teamBuild = {complexity: {}, positions: [] as TeamBuildPositionDto[]} as TeamBuildDto;
    }
    else{
      if (teamBuild.complexity == null){
        teamBuild.complexity = {} as TeamBuildComplexityDto;
      }
    }

    const dialogRef = this.dialog.open(TeamBuildDialogComponent, {
      width: '600px',
      autoFocus: false,
      data: {type: dialogType, data: teamBuild},
    });

    dialogRef.afterClosed().subscribe((teamBuild: TeamBuildDto) => {
      if (teamBuild == null)
        return;

      if (dialogType == DialogType.Create)
        this.teamBuildService.createTeamBuild(teamBuild).subscribe(() => {
          this.teamBuildService.getAllTeamBuilds().subscribe(teamBuilds => this.teamBuilds = teamBuilds);
          this.snackBarService.showSuccess('Created');
        });

      if (dialogType == DialogType.Edit)
        this.teamBuildService.updateTeamBuild(teamBuild).subscribe(() => {
          this.teamBuildService.getAllTeamBuilds().subscribe(teamBuilds => this.teamBuilds = teamBuilds);
          this.snackBarService.showSuccess('Updated');
        });
    });
  }
}
