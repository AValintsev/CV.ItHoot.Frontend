import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../../../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { TeamDto } from 'src/app/models/team/create-team-dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'cv-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team$!: Observable<TeamDto>
  constructor(
    private teamService:TeamService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.team$ = this.activatedRoute.params.pipe(switchMap(response=>this.teamService.getTeamById(response.id)))


  }

}
