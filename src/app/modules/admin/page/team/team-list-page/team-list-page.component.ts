import { Component, OnInit } from '@angular/core';
import {SmallTeamDto} from "../../../../../models/team/small-team-dto";
import {TeamService} from "../../../../../services/team.service";

@Component({
  selector: 'cv-team-list-page',
  templateUrl: './team-list-page.component.html',
  styleUrls: ['./team-list-page.component.scss']
})
export class TeamListPageComponent implements OnInit {
  teams: SmallTeamDto[] = [];
  constructor(private teamService:TeamService) {
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
  }


  ngOnInit(): void {
  }

  refreshTeams(){
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
  }
}
