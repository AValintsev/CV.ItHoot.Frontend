import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../../../services/team.service";
import {SmallTeamDto} from "../../../../../models/small-team-dto";
import {DialogType} from "../../../../../models/dialog-type";
import {TeamDto} from "../../../../../models/team-dto";
import {TeamDialogComponent} from "../team-dialog/team-dialog.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'cv-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'teamName', 'clientUserName','teamSize', 'lastUpdated', 'createdUserName', 'statusTeam','action'];
  teams: SmallTeamDto[] = [];

  constructor(private teamService:TeamService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
  }

  openTeamDialog(team:TeamDto|null = null): void {
    let dialogType:DialogType = DialogType.Edit;
    if(team == null){
      team = {} as TeamDto;
      dialogType = DialogType.Create;
    }

    const dialogRef = this.dialog.open(TeamDialogComponent, {
      autoFocus: false,
      data: { type: dialogType, data: team },
    });

    dialogRef.afterClosed().subscribe((team: TeamDto) => {
      if (team == null)
        return;
      if (dialogType == DialogType.Create) {
        this.teamService.createTeam(team).subscribe(()=>{
          this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
        });

      } else {
        this.teamService.updateTeam(team).subscribe();
        this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
      }

    });
  }

}
