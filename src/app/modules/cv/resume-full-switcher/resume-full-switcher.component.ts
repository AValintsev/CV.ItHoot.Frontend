import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProposalService} from '../../../services/proposal.service';
import {ActivatedRoute} from '@angular/router';
import {ResumeService} from '../../../services/resume.service';
import panzoom from 'panzoom';

@Component({
  selector: 'cv-resume-full-switcher',
  templateUrl: './resume-full-switcher.component.html',
  styleUrls: ['./resume-full-switcher.component.scss'],
})
export class ResumeFullSwitcherComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  resume!: any;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private resumeService: ResumeService
  ) {
    this.route.params.subscribe((params) => {
      const proposalId = params['proposalId'];
      const resumeId = params['resumeId'];
      const shortUrl = params['shortUrl'];
      if (shortUrl != null) {
        this.proposalService
          .getProposalResumeHtmlByUrl(shortUrl).pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((data) => {
            document.getElementById('resume')!.innerHTML = data.html;
            this.resume = data;
          });
      } else if (proposalId && resumeId) {
        this.proposalService
          .getProposalResumeHtml(proposalId, resumeId).pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((data) => {
            document.getElementById('resume')!.innerHTML = data.html;
            this.resume = data;
          });
      } else if (proposalId == null && resumeId) {
        this.resumeService.getResumeHtmlById(resumeId).pipe(
          takeUntil(this.destroy$)
        ).subscribe((data) => {
          document.getElementById('resume')!.innerHTML = data.html;
          this.resume = data;
        });
      }
    });
  }
  ngOnInit() {
    const zoom = panzoom(document.getElementById('resume')!, {
      minZoom: 0.3,
      maxZoom: 3.5,
      bounds: true,
      disableKeyboardInteraction: true,
      boundsPadding: 0.2
    });
  }

   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
