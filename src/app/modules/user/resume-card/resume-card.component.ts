import {Router} from '@angular/router';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {takeUntil} from 'rxjs/operators';
import {SmallResumeDto} from '../../../models/resume/small-resume-dto';
import {AccountService} from 'src/app/services/account.service';
import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserAuthData} from '../../../models/userAuthData';
import {UserRole} from '../../../models/users-type';
import {ResumeService} from 'src/app/services/resume.service';
import {MatDialog} from '@angular/material/dialog';
import * as saveAs from 'file-saver';

@Component({
  selector: 'resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.scss'],
})
export class ResumeCardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  @Input() resume!: SmallResumeDto;
  authData$!: Observable<UserAuthData>;
  Users = UserRole;

  constructor(
    private accountService: AccountService,
    private resumeService: ResumeService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private deleteModalService: DeleteModalService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  @Output() refresh = new EventEmitter();

  ngOnInit(): void {}

  deleteResume(id: number) {
    this.deleteModalService.matModal('Do you want to delete your resume?')
      .subscribe(response => {
        if (response)
          this.resumeService.deleteResume(id).subscribe(() => this.refresh.emit());
        return false;
      });
  }

  savePdf(resumeId: number, firstName: string = '', lastName: string = '') {
    this.resumeService.getResumePdfById(resumeId).subscribe((response) => {
      saveAs(response, `${firstName} ${lastName}.pdf`);
    });
  }

  saveDocX(resumeId: number, firstName: string = '', lastName: string = '') {
    this.resumeService.getResumeDocxById(resumeId).subscribe((response) => {
      saveAs(response, `${firstName} ${lastName}.docx`);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  duplicate(resume: SmallResumeDto) {
    this.resumeService.duplicateResume(resume.id).subscribe(() => {
      this.router.navigate(['/home/resume/edit/', resume.id])
    });
  }
}
