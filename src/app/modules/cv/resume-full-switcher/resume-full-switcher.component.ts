import {Component, OnInit} from '@angular/core';
import {ProposalService} from "../../../services/proposal.service";
import {ActivatedRoute} from "@angular/router";
import {ResumeService} from "../../../services/resume.service";


@Component({
  selector: 'cv-resume-full-switcher',
  templateUrl: './resume-full-switcher.component.html',
  styleUrls: ['./resume-full-switcher.component.scss']
})
export class ResumeFullSwitcherComponent implements OnInit {

  resume!:any;

  constructor(private proposalService: ProposalService,
              private route: ActivatedRoute,
              private resumeService:ResumeService) {
    this.route.params.subscribe(params => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];
      const shortUrl = params['shortUrl'];
      if(shortUrl != null)
      {
        this.proposalService.getProposalResumeHtmlByUrl(shortUrl).subscribe(data => {
          document.getElementById('resume')!.innerHTML = data.html;
          this.resume = data;
        });
      }
      else if(proposalId && resumeId){
        this.proposalService.getProposalResumeHtml(proposalId, resumeId).subscribe(data => {
          document.getElementById('resume')!.innerHTML = data.html;
          this.resume = data;
        });
      }else if(proposalId == null && resumeId){

        this.resumeService.getResumeHtmlById(resumeId).subscribe(data=>{
          document.getElementById('resume')!.innerHTML = data.html;
          this.resume = data;
        })
      }
    })

  }
  ngOnInit() {}
}
