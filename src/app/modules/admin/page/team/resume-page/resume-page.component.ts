import {Component, OnInit} from '@angular/core';
import {ResumeDto} from "../../../../../models/resume/resume-dto";
import {TeamService} from "../../../../../services/team.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cv-resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent implements OnInit {

  resume: ResumeDto | null = null;

  constructor(teamService:TeamService, route:ActivatedRoute) {
    route.params.subscribe(params => {
      const teamId = params['teamId'];
      const resumeId = params['resumeId'];

      teamService.getTeamResume(teamId, resumeId).subscribe(data => {
        this.resume = data.resume;
        this.resume!.resumeTemplateId = data.resumeTemplateId;
        this.resume!.showLogo = data.showLogo;
      });
    });
  }

  ngOnInit(): void {
  }

}
