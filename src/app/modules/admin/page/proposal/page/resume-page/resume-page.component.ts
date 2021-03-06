import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ResumeDto} from "../../../../../../models/resume/resume-dto";
import {ProposalService} from "../../../../../../services/proposal.service";
import {ActivatedRoute} from "@angular/router";
import panzoom from "panzoom";

@Component({
  selector: 'resume-page',
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss']
})
export class ResumePageComponent implements OnInit {

  @ViewChild('doc', {static: false}) doc!: ElementRef;
  resume: ResumeDto | null = null;

  constructor(private proposalService:ProposalService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];

      this.proposalService.getProposalResumeHtml(proposalId, resumeId).subscribe(data => {
        console.log(data)
        document.getElementById('doc')!.innerHTML= data.html
        const zoom = panzoom(this.doc.nativeElement,{
          minZoom:0.3,
          maxZoom:3.5,
          bounds:true
        });
      });
    });
  }
}
