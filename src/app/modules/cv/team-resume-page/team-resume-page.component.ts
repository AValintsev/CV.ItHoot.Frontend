import {Component, OnInit} from '@angular/core';
import {ResumeDto} from "../../../models/resume-dto";
import {TeamService} from "../../../services/team.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cv-team-resume-page',
  templateUrl: './team-resume-page.component.html',
  styleUrls: ['./team-resume-page.component.scss']
})
export class TeamResumePageComponent implements OnInit {

  resume: ResumeDto | null = null;

  constructor(private teamService: TeamService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const teamId = params['teamId'];
      const resumeId = params['resumeId'];

      this.teamService.getTeamResume(teamId, resumeId).subscribe(resume => {
        this.resume = resume.resume;
        this.resume.showLogo = resume.showLogo;
      })
    })

  }

  ngOnInit(): void {
  }

}
