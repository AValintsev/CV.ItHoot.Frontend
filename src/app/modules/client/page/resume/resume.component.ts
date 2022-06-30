import { debounceTime } from 'rxjs/operators';
import { ResumeService } from './../../../../services/resume.service';
import { map, takeUntil, delay } from 'rxjs/operators';
import { ClientProposalService } from '../../../../services/client/client-proposal.service';
import { switchMap, tap } from 'rxjs/operators';
import { ProposalService } from '../../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import { Subject } from 'rxjs';
import panzoom from 'panzoom';

@Component({
  selector: 'cv-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit, OnDestroy, OnDestroy {

  @ViewChild('doc') doc!: ElementRef;
  private destroy$ = new Subject<boolean>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService,
    private clientProposalService: ClientProposalService
  ) { }

  ngOnInit(): void {

    this.getResume();
  }
  getResume() {
    this.activatedRoute.params
      .pipe(
        debounceTime(300),
        tap((params) => {
          this.proposalService
            .getProposalById(params.proposalId).pipe(
              takeUntil(this.destroy$)
            )
            .subscribe((response) => {
              if (response) {
                this.clientProposalService.numberCheckedResume$.next({
                  proposalId: params.proposalId,
                  resumeId: params.resumeId,
                });
                this.clientProposalService.getProposalById(params.proposalId).pipe(takeUntil(this.destroy$)).subscribe();
                this.clientProposalService.headerTitle$.next(response.proposalName);
              }
            });
        }),

        switchMap((params) => this.proposalService.getProposalResumeHtml(params.proposalId, params.resumeId))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.doc.nativeElement.innerHTML = response.html;
            const zoom = panzoom(document.getElementById('doc')!, {
              minZoom: 0.3,
              maxZoom: 3.5,
              bounds: true,
              disableKeyboardInteraction: true,
              boundsPadding: 0.2
            });
          }
        },
        error: (error) => console.log(error),
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
