import { Component, OnInit } from '@angular/core';
import {SmallTeamDto} from "../../../../../models/team/small-team-dto";
import {TeamService} from "../../../../../services/team.service";

@Component({
  selector: 'cv-archive-list-page',
  templateUrl: './archive-list-page.component.html',
  styleUrls: ['./archive-list-page.component.scss']
})
export class ArchiveListPageComponent implements OnInit {

  teams: SmallTeamDto[] = [];

  constructor(private teamService:TeamService) {
    this.teamService.getArchiveTeams().subscribe(teams => this.teams = teams);
  }

  getArchiveTeams(){
      this.teamService.getArchiveTeams().subscribe(teams=>this.teams = teams);
  }

  ngOnInit(): void {
  }

}
