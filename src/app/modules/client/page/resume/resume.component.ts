import {debounceTime, switchMap, tap} from 'rxjs/operators';
import {ClientProposalService} from '../../../../services/client/client-proposal.service';
import {ProposalService} from '../../../../services/proposal.service';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import panzoom from 'panzoom';
import {ResumeDto} from "../../../../models/resume/resume-dto";
import { Subject } from 'rxjs';

@Component({
  selector: 'cv-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit {

  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();


  resume:ResumeDto|null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService,
    private clientProposalService: ClientProposalService
  ) { }

  ngOnInit(): void {

    this.getResume();
  }
  getResume() {
    this.activatedRoute.params.pipe(
      debounceTime(300),
      tap((params) => {
          this.proposalService.getProposalById(params.proposalId).subscribe(proposal => {
              if (proposal) {
                this.clientProposalService.numberCheckedResume$.next({
                  proposalId: params.proposalId,
                  resumeId: params.resumeId,
                });
                this.clientProposalService.getProposalById(params.proposalId).subscribe();
                this.clientProposalService.headerTitle$.next(proposal.proposalName);
              }
            });
        }),

        switchMap((params) => this.proposalService.getProposalResume(params.proposalId, params.resumeId))
      ).subscribe(data=>{
      if (data) {
        this.resume = data.resume;
        this.resume!.showLogo = data.showLogo;
        this.resume!.resumeTemplateId = data.resumeTemplateId;
        this.resumeChanged.next(data.resume)
        const zoom = panzoom(document.getElementById('resume')!, {
          minZoom: 0.3,
          maxZoom: 3.5,
          bounds: true,
          disableKeyboardInteraction: true,
          boundsPadding: 0.2
        });
      }
    });
  }


}
