import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ProposalDto,
  ProposalResumeDto,
  StatusProposalResume,
} from '../../../../../models/proposal/proposal-dto';
import { ProposalService } from '../../../../../services/proposal.service';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../../../../services/resume.service';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProposalSettingDialogComponent } from '../proposal-setting-dialog/proposal-setting-dialog.component';
import { ProposalAddResumeDialogComponent } from '../proposal-add-resume-dialog/proposal-add-resume-dialog.component';
import { SmallResumeDto } from '../../../../../models/resume/small-resume-dto';
import { StatusProposal } from '../../../../../models/enums';

@Component({
  selector: 'proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  displayedColumns: string[] = [
    'resumeName',
    'fullName',
    'position',
    'salaryRate',
    'skills',
    'isSelected',
    'action',
  ];
  @Input() proposal!: ProposalDto;
  StatusResume = StatusProposalResume;
  loading: boolean = false;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openProposalDialog(): void {
    const dialogRef = this.dialog.open(ProposalSettingDialogComponent, {
      autoFocus: false,
      width: '500px',
      data: this.proposal,
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((proposal: ProposalDto) => {
      if (proposal == null) return;
      proposal.clientId = proposal.client.userId;
      this.proposalService.updateProposal(proposal).pipe(
        takeUntil(this.destroy$)
      ).subscribe((proposal) => {
        this.proposal = proposal;
        this.snackBarService.showSuccess('Updated');
      });
    });
  }

  openResumeDialog(): void {
    const dialogRef = this.dialog.open(ProposalAddResumeDialogComponent, {
      autoFocus: false,
      width: '500px',
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe((resume: SmallResumeDto) => {
      if (resume == null) return;
      this.proposal.resumes.push({ resumeId: resume.id } as ProposalResumeDto);
      this.proposal.clientId = this.proposal.client.userId;
      this.proposalService
        .updateProposal(this.proposal).pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((proposal) => {
          this.proposal = proposal;
          this.snackBarService.showSuccess('Added');
        });
    });
  }

  deleteResume(resume: ProposalResumeDto) {
    const id = this.proposal.resumes.indexOf(resume);
    this.proposal.resumes = this.proposal.resumes.filter(
      (item, index) => index !== id
    );
    this.proposal.clientId = this.proposal.client.userId;
    this.proposalService.updateProposal(this.proposal).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.snackBarService.showSuccess('Removed');
    });
  }

  getStatusProposal(status: StatusProposal): string {
    switch (status) {
      case StatusProposal.Created:
        return 'Created';
      case StatusProposal.InReview:
        return 'In Review';
      case StatusProposal.Approved:
        return 'Approved';
      case StatusProposal.Done:
        return 'Done';
      case StatusProposal.Denied:
        return 'Denied';
      case StatusProposal.InWorking:
        return 'In Working';
      default:
        return 'None';
    }
  }

  copyClientLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value =
    selBox.value = window.location.origin+`/account/${this.proposal.client.shortAuthUrl}/${this.proposal.id}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snackBarService.showSuccess('Link copied');
  }

  copyResumeLink(resume: ProposalResumeDto) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.origin + `/proposals/resume/${resume.shortUrl}`;
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
