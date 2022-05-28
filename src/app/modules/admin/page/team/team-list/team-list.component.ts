import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamService} from "../../../../../services/team.service";
import {SmallTeamDto} from "../../../../../models/team/small-team-dto";
import {TeamDialogComponent} from "../team-dialog/team-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TeamDto} from "../../../../../models/team/create-team-dto";
import {StatusTeam} from "../../../../../models/enums";


@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'teamName', 'clientUserName', 'teamSize', 'lastUpdated', 'createdUserName', 'statusTeam', 'action'];
  @Input()teams: SmallTeamDto[] = [];
  @Output() refreshTeams: EventEmitter<any> = new EventEmitter<any>();
  constructor(private teamService: TeamService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openTeamDialog(): void {
    const team = {} as TeamDto;

    const dialogRef = this.dialog.open(TeamDialogComponent, {
      autoFocus: false,
      data: team
    });

    dialogRef.afterClosed().subscribe((team: TeamDto) => {
      if (team == null)
        return;

      this.teamService.createTeam(team).subscribe(() => {
        this.refreshTeams.emit(this.teams);
      });
    });

  }

  getStatusTeam(status: StatusTeam): string {
    switch (status) {
      case StatusTeam.Created:
        return 'Created';
      case StatusTeam.InReview:
        return 'In Review';
      case StatusTeam.Approved:
        return 'Approved';
      case StatusTeam.Done:
        return 'Done';
      case StatusTeam.Denied:
        return 'Denied';
      case StatusTeam.InWorking:
        return 'In Working';
      default:
        return 'None'
    }
  }
}
