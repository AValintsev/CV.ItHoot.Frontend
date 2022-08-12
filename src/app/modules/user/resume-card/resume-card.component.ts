import {Router} from '@angular/router';
import {DeleteModalService} from 'src/app/services/delete-modal.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {takeUntil} from 'rxjs/operators';
import {SmallResumeDto} from '../../../models/resume/small-resume-dto';
import {AccountService} from 'src/app/services/account.service';
import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserAuthData} from '../../../models/userAuthData';
import {Users} from '../../../models/users-type';
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
  Users = Users;
  constructor(
    private accountService: AccountService,
    private resumeService: ResumeService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private deleteModalService:DeleteModalService,
    private router:Router,
    private cdr:ChangeDetectorRef
  ) {
    // this.authData$ = this.authService.UserValue2();
  }
  @Output() refresh = new EventEmitter();
  ngOnInit(): void {}

  deleteResume(id: number) {
    this.deleteModalService.matModal('Do you want to delete your resume?')
      .subscribe({
        next: (response) => {
          if (response) {
            this.resumeService
              .deleteResume(id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (response) => {
                  this.refresh.emit();
                },
                error: (error) => console.log(error),
              });
          }
          return false;
        },
        error: (error) => {},
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
    this.resumeService.duplicateResume(resume.id).subscribe((e)=>{
      this.router.navigate(['/home/cv/edit/',resume.id])
      // console.log(e)
      // this.cdr.detectChanges()
      // this.refresh.emit();
    })
  }
}
