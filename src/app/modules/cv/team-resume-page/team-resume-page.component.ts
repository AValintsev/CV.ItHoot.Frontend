import {Component, OnInit} from '@angular/core';
import {ResumeDto} from "../../../models/resume/resume-dto";
import {TeamService} from "../../../services/team.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cv-team-resume-page',
  templateUrl: './team-resume-page.component.html',
  styleUrls: ['./team-resume-page.component.scss']
})
export class TeamResumePageComponent implements OnInit {

  resume!: ResumeDto | null;

  constructor(private teamService: TeamService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const teamId = params['teamId'];
      const resumeId = params['resumeId'];
      const shortUrl = params['shortUrl'];
      if(!shortUrl)
      {
        this.teamService.getTeamResume(teamId, resumeId).subscribe(data => {
          this.resume = data.resume;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
          this.resume!.showLogo = data.showLogo;
        });
      }
      else{
        this.teamService.getTeamResumeByUrl(shortUrl).subscribe(data => {
          this.resume = data.resume;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
          this.resume!.showLogo = data.showLogo;
        });
      }
    })

  }

  ngOnInit(): void {
  }

}
