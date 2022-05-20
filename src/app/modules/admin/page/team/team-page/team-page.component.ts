import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../../../services/team.service";
import {SmallTeamDto} from "../../../../../models/small-team-dto";

@Component({
  selector: 'cv-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'teamName', 'countResumes','statusTeam'];
  teams: SmallTeamDto[] = [];

  constructor(private teamService:TeamService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(teams => this.teams = teams);
  }

}
