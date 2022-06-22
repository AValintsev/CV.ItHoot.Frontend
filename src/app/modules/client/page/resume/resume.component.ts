import { takeUntil } from 'rxjs/operators';
import { ClientProposalService } from '../../../../services/client/client-proposal.service';
import { switchMap, tap } from 'rxjs/operators';
import { ProposalService } from '../../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeDto } from 'src/app/models/resume/resume-dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'cv-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent implements OnInit,OnDestroy, OnDestroy {
  showLogo!: boolean;
  resumeTemplateId = 1;
  resume!: ResumeDto;
  private destroy$ = new Subject<boolean>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService,
    private clientProposalService: ClientProposalService
  ) {}

  ngOnInit(): void {
    this.getResume();
  }
  getResume() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap((params) => {
          this.showLogo = params.showLogo;
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
                this.clientProposalService
                  .getProposalById(params.proposalId).pipe(
                    takeUntil(this.destroy$)
                  )
                  .subscribe();
                this.clientProposalService.headerTitle$.next(
                  response.proposalName
                );
              }
            });
        }),
        switchMap((params) =>
          this.proposalService.getProposalResume(
            params.proposalId,
            params.resumeId
          )
        )
      )
      .subscribe({
        next: (response) => {
          this.resume = response.resume;
          this.resume.showLogo = response.showLogo;
          this.resumeTemplateId = response.resumeTemplateId;
        },
        error: (error) => console.log(error),
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
