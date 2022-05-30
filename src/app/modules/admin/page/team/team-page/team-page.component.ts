import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../../../../services/team.service";
import {TeamDto} from "../../../../../models/team/create-team-dto";

@Component({
  selector: 'cv-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {

  team:TeamDto = {} as TeamDto

  constructor(private route: ActivatedRoute, private teamService:TeamService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.teamService.getTeamById(id).subscribe(team => this.team = team);
    });
  }

  ngOnInit(): void {

  }


}
