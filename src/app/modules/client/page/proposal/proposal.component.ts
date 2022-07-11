import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import * as saveAs from 'file-saver';
import {StatusProposal} from 'src/app/models/enums';
import {
  ProposalApprove,
  ProposalApproveResume,
  ProposalResumeDto,
  StatusProposalResume,
} from 'src/app/models/proposal/proposal-dto';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {ProposalService} from 'src/app/services/proposal.service';
import {ClientProposalService} from 'src/app/services/client/client-proposal.service';
import {fromEvent, Subject} from 'rxjs';
import {DeleteModalService} from 'src/app/services/delete-modal.service';

@Component({
  selector: 'cv-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
  animations: [
    trigger('hidden', [
      state('start', style({})),
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(
          300,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ProposalComponent implements OnInit, OnDestroy, OnDestroy {
  private destroy$ = new Subject<boolean>();
  screenSizeMd = 970
  statusProposal = StatusProposal;
  statusResume = StatusProposalResume;
  screenWidth: number
  status = 1;
  statusUserCard: number[] = [];
  cardId!: number;
  approveObject: ProposalApprove = { proposalId: 0, resumes: [] };
  toggleBtn = true;
  @Input() checkArrayAll: number[] = [];
  checkArray: number[] = [];
  @Input() resumeArray: any = [];
  @Input() isIncognito: boolean = false;
  @Input() proposalId!: number;
  @Input() statusObject!: ProposalApprove;
  @Input() statusArray: { id: number; isSelected: boolean }[] = [];
  @Input() set setStatusProposal(status: number) {
    this.status = status;
  }
  @Output() statusChang = new EventEmitter();
  constructor(
    private deleteModalService: DeleteModalService,
    private snackBarService: SnackBarService,
    private proposalService: ProposalService,
    private clientProposalService: ClientProposalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
    fromEvent(window, 'resize').pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => this.screenWidth = window.innerWidth)
  }

  checkSelectedResume(status: ProposalResumeDto[]) {
    return status.filter(
      (resume) => resume.statusResume === this.statusResume.Selected
    ).length;
  }

  deleteCardCondition(id: number) {
    this.cardId = id;
    this.resumeArray[1] = this.resumeArray[1].filter(
      (resume: any) => resume.id !== id
    );
    this.checkArray = this.checkArray.filter((e) => e != id);
    this.checkArrayAll = this.checkArrayAll.filter((e) => e != id);
    const checkExistElement = this.statusObject?.resumes?.filter(
      (e) => e.id == id
    );
    if (checkExistElement.length) {
      this.statusObject.resumes = this.statusObject.resumes?.map(
        (e) => {
          if (e.id == id) {
            return { id, isSelected: false };
          }
          return e;
        }
      );
    } else {
      this.statusObject.resumes.push({
        id,
        isSelected: false,
      });
    }
    this.approveUsers(this.statusObject.resumes, this.checkArrayAll);
  }

  deleteCard(id: number, event: Event, index: number, length: number) {
    event.stopPropagation();
    this.deleteModalService.matModal('Do you want to delete user card?')
      .subscribe({
        next: (response) => {
          if (this.screenWidth >= this.screenSizeMd) {
            if (response && (index == 0 || index == length || !this.toggleBtn)) {
              this.deleteCardCondition(id)
            }
          } else {
            if (response) {
              this.deleteCardCondition(id)
            }

          }

        },
        error: (error) =>
          this.snackBarService.showDanger('Something went wrong!'),
      });
  }
  calcTransform(i: number, item: number) {
    if (item <= 5) {
      return -60 * i;
    } else if (item <= 10) {
      return -75 * i;
    } else if (item <= 15) {
      return -85 * i;
    } else if (item <= 20) {
      return -91 * i;
    } else {
      return -94 * i;
    }
  }

  showCard(i: number) {
    if (this.screenWidth >= this.screenSizeMd) {
      const card = this.resumeArray[1].splice(i, 1);
      if (card) {
        this.resumeArray[1].unshift(card[0]);
      }
    }

  }
  savePdf(
    proposalId: number,
    resumeId: number,
    firstName: string,
    lastName: string
  ) {
    this.proposalService
      .getProposalResumePdf(proposalId, resumeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        saveAs(response, `${firstName} ${lastName}.pdf`);
      });
  }

  approveUsers(statusObject: ProposalApproveResume[], checkArrayAll: number[]) {
    const approveObject = {
      proposalId: this.proposalId,
      resumes: this.statusObject.resumes,
    };
    this.statusChang.emit([approveObject, checkArrayAll]);
  }

  checkSelect(id: number) {
    return this.checkArray.includes(id);
  }

  selectToggleCondition(id: number) {
    if (!this.statusObject.resumes.filter((e) => e.id == id).length) {
      this.checkArray.push(id);
      this.checkArrayAll.push(id);
      this.statusObject.resumes.push({
        id,
        isSelected: true,
      });
      this.approveUsers(this.statusObject.resumes, this.checkArrayAll);
    }
  }

  selectToggle(
    id: number,
    select: boolean,
    index: number,
    event: Event,
    length: number
  ) {
    event.stopPropagation();
    if (this.screenWidth >= this.screenSizeMd) {
      if (select && (index == 0 || index == length || !this.toggleBtn)) {
        this.selectToggleCondition(id)
      }
    } else {
      this.selectToggleCondition(id)
    }
  }

  navigateToResume(proposalId: number, resumeId: number) {
    this.router.navigate(['client/proposal', proposalId, 'resume', resumeId]);
    this.clientProposalService.numberCheckedResume$.next({
      proposalId,
      resumeId,
    });
    // localStorage.setItem('userResume',JSON.stringify({proposalId,resumeId}))
  }

  chechVisibleCardLine(resumeArray: ProposalResumeDto[]) {
    return resumeArray.filter(
      (resume) => resume.statusResume !== this.statusResume.Denied
    ).length;
  }

  sliceName(firstName: string, secondName: string) {
    const maxLength = 20;
    const fullNameLength = firstName.length + secondName.length;
    if (fullNameLength > 21) {
      return secondName.slice(0, maxLength - firstName.length) + '...';
    }
    return secondName;
  }

  incognito(secondName: string) {
    return secondName.slice(0, 1) + '.'
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

// document.documentElement.clientWidth
// window.innerWidth
