import {Component, OnInit,} from '@angular/core';
import {ResumeDto} from '../../../../../../models/resume/resume-dto';
import {ProposalService} from '../../../../../../services/proposal.service';
import {ActivatedRoute} from '@angular/router';
import panzoom from 'panzoom';
import { Location } from '@angular/common'
@Component({
  selector: 'resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
})
export class ResumePageComponent implements OnInit {
  resume: ResumeDto | null = null;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];

      this.proposalService.getProposalResume(proposalId, resumeId).subscribe(resume=> {
        this.resume = resume.resume;
        this.resume!.showLogo = resume.showLogo;
        this.resume!.resumeTemplateId = resume.resumeTemplateId;
          const zoom = panzoom(document.getElementById('doc')!, {
            minZoom: 0.3,
            maxZoom: 3.5,
            bounds: true,
            disableKeyboardInteraction: true,
            boundsPadding: 0.2
          });
        });
    });
  }
  back(){
    this.location.back()
  }
}
