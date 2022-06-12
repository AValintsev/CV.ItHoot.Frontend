import {Component, OnInit} from '@angular/core';
import {ResumeDto} from "../../../models/resume/resume-dto";
import {ProposalService} from "../../../services/proposal.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'cv-resume-full-switcher',
  templateUrl: './resume-full-switcher.component.html',
  styleUrls: ['./resume-full-switcher.component.scss']
})
export class ResumeFullSwitcherComponent implements OnInit {

  resume!: ResumeDto | null;

  constructor(private proposalService: ProposalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];
      const shortUrl = params['shortUrl'];
      if(!shortUrl)
      {
        this.proposalService.getProposalResume(proposalId, resumeId).subscribe(data => {
          this.resume = data.resume;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
          this.resume!.showLogo = data.showLogo;
        });
      }
      else{
        this.proposalService.getProposalResumeByUrl(shortUrl).subscribe(data => {
          this.resume = data.resume;
          this.resume!.resumeTemplateId = data.resumeTemplateId;
          this.resume!.showLogo = data.showLogo;
        });
      }
    })

  }
  ngOnInit() {}
}
