import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../../../services/proposal.service';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';

@Component({
  selector: 'proposal-resume-download-page',
  templateUrl: './proposal-resume-download-page.component.html',
  styleUrls: ['./proposal-resume-download-page.component.scss'],
})
export class ProposalResumeDownloadPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private proposalService: ProposalService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      const shortUrl = params['shortUrl'];
      const docType = params['docType'];
      window.self.close();

      if (shortUrl && docType) {
        if (docType == "docx") {
          proposalService
            .getProposalResumeDocxByUrl(shortUrl).pipe(
              takeUntil(this.destroy$)
            )
            .subscribe((response) => {
              saveAs(response, `resume.docx`);
              this.router.navigate(['']);
            });
        }
        else if (docType == "pdf") {
          proposalService
            .getProposalResumePdfByUrl(shortUrl).pipe(
              takeUntil(this.destroy$)
            )
            .subscribe((response) => {
              saveAs(response, `resume.pdf`);
              this.router.navigate(['']);
            });
        }
      }
    });
  }

  ngOnInit(): void { }
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
