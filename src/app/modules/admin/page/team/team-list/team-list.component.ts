import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../../../services/team.service";
import {SmallTeamDto} from "../../../../../models/small-team-dto";
import {CreateTeamDto} from "../../../../../models/create-team-dto";
import {TeamDialogComponent} from "../team-dialog/team-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'teamName', 'clientUserName','teamSize', 'lastUpdated', 'createdUserName', 'statusTeam','action'];
  teams: SmallTeamDto[] = [];

  constructor(private teamService:TeamService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
  }

  openTeamDialog(): void {
     const team = {} as CreateTeamDto;

    const dialogRef = this.dialog.open(TeamDialogComponent, {
      autoFocus: false,
      data: team
    });

    dialogRef.afterClosed().subscribe((team: CreateTeamDto) => {
      if (team == null)
        return;

      this.teamService.createTeam(team).subscribe(() => {
        this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
      });
    });

  }

}
