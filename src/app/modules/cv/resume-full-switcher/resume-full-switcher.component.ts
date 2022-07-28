import {Component, OnInit} from '@angular/core';
import {ProposalService} from '../../../services/proposal.service';
import {ActivatedRoute} from '@angular/router';
import {ResumeService} from '../../../services/resume.service';
import {ResumeDto} from "../../../models/resume/resume-dto";

@Component({
  selector: 'cv-resume-full-switcher',
  templateUrl: './resume-full-switcher.component.html',
  styleUrls: ['./resume-full-switcher.component.scss'],
})
export class ResumeFullSwitcherComponent implements OnInit {

  resume: ResumeDto | null = null;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];
      const shortUrl = params['shortUrl'];
      const resumeUrl = params['resumeUrl'];
      if (shortUrl != null) {

        this.proposalService.getProposalResumeByUrl(shortUrl).subscribe((data) => {
          this.resume = data.resume;
          this.resume!.showLogo = data.showLogo;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
        });

      } else if (proposalId && resumeId) {

        this.proposalService.getProposalResume(proposalId, resumeId).subscribe((data) => {
          this.resume = data.resume;
          this.resume!.showLogo = data.showLogo;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
        });

      } else if (proposalId == null && resumeId) {
        this.resumeService.getResumeById(resumeId).subscribe(resume => {
          this.resume = resume;
          this.resume.showLogo = false;
        });

      } else if (resumeUrl != null) {
        this.resumeService.getResumeByUrl(resumeUrl).subscribe(data => {
          this.resume = data.resume;
          this.resume!.showLogo = data.showLogo;
        });
      }
    });
  }
}
