import { ResumeService } from './../../../../services/resume.service';
import { map, takeUntil } from 'rxjs/operators';
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
export class ResumeComponent implements OnInit,OnDestroy, OnDestroy {
  showLogo!: boolean;
  resumeTemplateId = 1;
  resume!: ResumeDto;
  @ViewChild('doc') doc!: ElementRef;
  private destroy$ = new Subject<boolean>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService,
    private clientProposalService: ClientProposalService
  ) {}
  // this.route.params
  // .pipe(
  //   map((params) => params['id'])
  //   )
  //   .subscribe((id) => {
  //   this.resumeService.getResumeHtmlById(id).pipe(
  //     takeUntil(this.destroy$)
  //   ).subscribe((resume) => {
  //     this.doc.nativeElement.innerHTML = resume.html;
  //   });
  //   const zoom = panzoom(document.getElementById('doc')!, {
  //     minZoom: 0.3,
  //     maxZoom: 3.5,
  //     bounds: true,
  //   });
  // });
  ngOnInit(): void {
     
    this.getResume();
  }
  getResume() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap((params) => {
          console.log('params',params)
          this.showLogo = params.showLogo;
          
          this.proposalService
            .getProposalById(params.proposalId).pipe(
              takeUntil(this.destroy$)
            )
            .subscribe((response) => {
              this.proposalService.getProposalResumeHtml(params.proposalId,params.resumeId).pipe(
                takeUntil(this.destroy$)
              ).subscribe((resume) => {
                this.doc.nativeElement.innerHTML = resume.html;
              });
              const zoom = panzoom(document.getElementById('doc')!, {
                minZoom: 0.3,
                maxZoom: 3.5,
                bounds: true,
              });
              if (response) {
                this.clientProposalService.numberCheckedResume$.next({
                  proposalId: params.proposalId,
                  resumeId: params.resumeId,
                });
                this.clientProposalService.getProposalById(params.proposalId).pipe(takeUntil(this.destroy$)).subscribe();
                this.clientProposalService.headerTitle$.next( response.proposalName);
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
          console.log(response)
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
