import { SmallTeamDto } from './../../../../models/team/small-team-dto';
import { Observable } from 'rxjs';
import { TeamService } from './../../../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'cv-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams$!:Observable<SmallTeamDto[]>
  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.teams$ =this.teamService.getAllTeams()
  }

}
