import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../../services/team.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'cv-team-resume-download-page',
  templateUrl: './team-resume-download-page.component.html',
  styleUrls: ['./team-resume-download-page.component.scss']
})
export class TeamResumeDownloadPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private teamService: TeamService,
              private router:Router) {
    activatedRoute.params.subscribe(params => {
      const shortUrl = params['shortUrl'];
      window.self.close();

      if (shortUrl) {
        teamService.getTeamResumePdfByUrlShort(shortUrl).subscribe((response) => {
          saveAs(response, `resume.pdf`);
          this.router.navigate(['']);
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
