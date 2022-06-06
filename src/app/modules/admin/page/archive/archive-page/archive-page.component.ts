import { Component, OnInit } from '@angular/core';
import {TeamDto} from "../../../../../models/team/create-team-dto";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../../../../services/team.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'cv-archive-page',
  templateUrl: './archive-page.component.html',
  styleUrls: ['./archive-page.component.scss']
})
export class ArchivePageComponent implements OnInit {

  team:TeamDto = {} as TeamDto

  constructor(private route: ActivatedRoute, private teamService:TeamService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.teamService.getTeamById(id).subscribe(team => this.team = team);
    });
  }

  ngOnInit(): void {
  }

}
