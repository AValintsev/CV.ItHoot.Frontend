import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ProposalDto,
  ProposalResumeDto,
} from '../../../../../models/proposal/proposal-dto';
import { saveAs } from 'file-saver';
import { ProposalService } from '../../../../../services/proposal.service';
import { SnackBarService } from '../../../../../services/snack-bar.service';

@Component({
  selector: 'pdf-table-button',
  templateUrl: './pdf-table-button.component.html',
  styleUrls: ['./pdf-table-button.component.scss'],
})
export class PdfTableAction implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Input() resume!: ProposalResumeDto;
  @Input() proposal!: ProposalDto;
  constructor(
    private proposalService: ProposalService,
    private snackBarService: SnackBarService
  ) {}
  loading: boolean = false;
  ngOnInit(): void {}

  getPdf() {
    this.loading = true;
    this.proposalService
      .getProposalResumePdf(this.proposal.id, this.resume.id).pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((file) => {
        saveAs(file, `${this.resume.firstName} ${this.resume.lastName}.pdf`);
        this.loading = false;
      });
  }

  getLinkPdf() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value =
      window.location.origin + `/proposals/resume/${this.resume.shortUrl}/pdf`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBarService.showSuccess('Link copied');
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
