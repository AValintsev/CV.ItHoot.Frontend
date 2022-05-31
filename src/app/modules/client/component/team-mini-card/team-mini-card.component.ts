import { Component, Input, OnInit } from '@angular/core';
import { SmallTeamDto } from 'src/app/models/team/small-team-dto';


@Component({
  selector: 'cv-team-mini-card',
  templateUrl: './team-mini-card.component.html',
  styleUrls: ['./team-mini-card.component.scss']
})
export class TeamMiniCardComponent implements OnInit {
  @Input() team!: SmallTeamDto;
  constructor() { }

  ngOnInit(): void {
    console.log(this.team)
  }

}
