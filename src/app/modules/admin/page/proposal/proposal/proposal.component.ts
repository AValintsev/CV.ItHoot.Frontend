import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProposalDto, ProposalResumeDto, StatusProposalResume,} from '../../../../../models/proposal/proposal-dto';
import {ProposalService} from '../../../../../services/proposal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumeService} from '../../../../../services/resume.service';
import {SnackBarService} from '../../../../../services/snack-bar.service';
import {MatDialog} from '@angular/material/dialog';
import {ProposalSettingDialog} from '../proposal-setting-dialog/proposal-setting-dialog.component';
import {ProposalAddResumeDialog} from '../proposal-add-resume-dialog/proposal-add-resume-dialog.component';
import {SmallResumeDto} from '../../../../../models/resume/small-resume-dto';
import {StatusProposal} from '../../../../../models/enums';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import * as saveAs from 'file-saver';
import {MatButtonToggleGroup} from '@angular/material/button-toggle';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  displayedColumns: string[] = [
    'action',
    'resumeName',
    'fullName',
    'position',
    'salaryRate',
    'skills',
    'isSelected',
  ];
  @Input() showEditBtn = true;
  @Input() proposal!: ProposalDto;
  @Input() url!: string;
  StatusResume = StatusProposalResume;
  loading: boolean = false;

  constructor(
    private proposalService: ProposalService,
    private deleteModalService: DeleteModalService,
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
    private spinnerService:NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  openProposalDialog(): void {
    const dialogRef = this.dialog.open(ProposalSettingDialog, {
      autoFocus: false,
      width: '500px',
      data: this.proposal,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((proposal: ProposalDto) => {
        if (!proposal) return;
        proposal.clientId = proposal.client.userId;
        this.proposalService
          .updateProposal(proposal)
          .pipe(takeUntil(this.destroy$))
          .subscribe((proposal) => {
            this.proposal = proposal;
            this.snackBarService.showSuccess('Updated');
          });
      });
  }

  openResumeDialog(): void {
    const dialogRef = this.dialog.open(ProposalAddResumeDialog, {
      autoFocus: false,
      width: '500px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resume: SmallResumeDto) => {
        if (!resume) return;
        this.proposal.resumes.push({
          resumeId: resume.id,
        } as ProposalResumeDto);
        this.proposal.clientId = this.proposal.client.userId;
        this.proposalService
          .updateProposal(this.proposal)
          .pipe(takeUntil(this.destroy$))
          .subscribe((proposal) => {
            this.proposal = proposal;
            this.snackBarService.showSuccess('Saved');
          });
      });
  }

  deleteResume(resume: ProposalResumeDto) {
    this.deleteModalService
      .matModal('Do you want to remove resume?')
      .subscribe({
        next: (response) => {
          if (response) {
            const id = this.proposal.resumes.indexOf(resume);
            this.proposal.resumes = this.proposal.resumes.filter(
              (item, index) => index !== id
            );
            this.proposal.clientId = this.proposal.client.userId;
            this.proposalService
              .updateProposal(this.proposal)
              .pipe(takeUntil(this.destroy$))
              .subscribe(() => {
                this.snackBarService.showSuccess('Removed');
              });
          }
          return false;
        },
        error: (error) => {},
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
    navigator.clipboard.writeText( window.location.origin + `/account/${this.proposal.client.shortAuthUrl}/${this.proposal.id}`);
    this.snackBarService.showSuccess('Link copied');
  }

  copyResumeLink(resume: ProposalResumeDto) {
    navigator.clipboard.writeText( window.location.origin + `/proposals/resume/${resume.shortUrl}`);
    this.snackBarService.showSuccess('Link copied');
  }

  getLinkPdf(resume: ProposalResumeDto) {
    navigator.clipboard.writeText(window.location.origin + `/proposals/resume/${resume.shortUrl}/pdf`);
    this.snackBarService.showSuccess('Link copied');
  }

  getPdf(resume: ProposalResumeDto) {
    this.spinnerService.show()
    this.proposalService.getProposalResumePdf(this.proposal.id, resume.id).subscribe((file) => {
      saveAs(file, `${resume.firstName} ${resume.lastName}.pdf`);
      this.spinnerService.hide()
    });
  }

  getDocx(resume: ProposalResumeDto) {
    this.spinnerService.show()
    this.proposalService.getProposalResumeDocx(this.proposal.id, resume.id).subscribe((file) => {
        saveAs(file, `${resume.firstName} ${resume.lastName}.docx`);
      this.spinnerService.hide()

    });
  }

  getLinkDocx(resume: ProposalResumeDto) {
    navigator.clipboard.writeText(   window.location.origin + `/proposals/resume/${resume.shortUrl}/docx`);
    this.snackBarService.showSuccess('Link copied');
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  recoverProposal(){
    this.proposalService.recoverProposalById(this.proposal.id).subscribe(() => {
      this.snackBarService.showSuccess('Recovered');
      this.router.navigate([`/admin/proposals/${this.proposal.id}`]);
    });
  }

}
